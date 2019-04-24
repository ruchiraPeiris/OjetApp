/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery','ojs/ojselectcombobox','ojs/ojchart'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
      var self = this;
      self.val = ko.observable("bar");
      self.name = ko.observable("Ruchira");
      var groups = ["Group A", "Group B","Group C"];
        
        function getValue() {
            return 10 + Math.round(Math.random()*50);
        }
        
        function getSeriesItems() {
           var items = [];
           for (var g = 0; g < groups.length; g++) {
               items.push(getValue());
           }
           return items;
        }
        
        var series = [{name: "Series 1", items: getSeriesItems()},
                      {name: "Series 2", items: getSeriesItems()},
                      {name: "Series 3", items: getSeriesItems()},
                      {name: "Series 4", items: getSeriesItems()}];
        
        self.seriesValue = ko.observableArray(series);
        self.groupsValue = ko.observableArray(groups);
        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');
      
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
