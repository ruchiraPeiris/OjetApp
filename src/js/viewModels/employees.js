
  require(['ojs/ojcore', 'knockout', 'jquery', 'text!data/projectData.json', 'ojs/ojknockout', 'ojs/ojtreeview', 'ojs/ojcollectiontreedatasource'],
  function(oj, ko, $, jsonData) {
    function TreeViewModel() {
      var Employee = oj.Model.extend({
        idAttribute: 'EmployeeId'
      });
      var empData = JSON.parse(jsonData);
      
      function getChildCollection(rootCollection, model) {
        // Create a collection
        var employees = new oj.Collection(null, {model: Employee});
        var mgrId = model === null ? null : model.id;
        // Root collection, check where ManagerId == null
        for (var i = 0; i < empData.length; i++) {
          if (empData[i]["ManagerId"] === mgrId) {
            employees.add(empData[i]);
          }
        }
        return employees;
      }

      function parseMetadata(model) {
        function findEmployee(id) {
          if (id) {
            for (var i = 0; i < empData.length; i++) {
              if (id === empData[i].EmployeeId) {
                return i;
              }
            }
          }
          return -1;
        }

        function findManager(id) {
          if (id) {
            for (var i = 0; i < empData.length; i++) {
              if (id === empData[i].ManagerId) {
                return i;
              }
            }
          }
          return -1;
        }

        function countDepth(model, depth) {
          if (model && model.id) {
            var managerLoc = findEmployee(model.get("ManagerId"));
            if (managerLoc > -1) {
              // I have a manager, increment depth and search for
              // my manager's Model 
              depth++;
              return countDepth(
                new Employee(empData[managerLoc]), depth
              );
            }
          }
          return depth;
        }

        // Look this up in the data table, 
        // then back out to see depth/leaf
        var retObj = {};
        retObj['key'] = model.id;

        // Does anyone have model.id as a ManagerId?  If not, it's a leaf
        var leaf = true;
        var managerLoc = findManager(model.id);
        if (managerLoc > -1) {
          // Not a leaf
          leaf = false;
        }
        retObj['leaf'] = leaf;
        retObj['depth'] = countDepth(model, 1);
        return retObj;
      }

      this.dataSource = new oj.CollectionTreeDataSource({
        root: getChildCollection(null, null),
        parseMetadata: parseMetadata,
        childCollectionCallback: getChildCollection
      });

      this.renderer = oj.KnockoutTemplateUtils.getRenderer('item_t', true);
    }

    $(function() {
      ko.applyBindings(new TreeViewModel(), document.getElementById('treeview'));
    });
  });
