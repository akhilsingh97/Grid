
var app = angular.module('app', ['ngAnimate', 'ui.grid', 'ui.grid.edit', 'ui.bootstrap']);

app.controller('MainCtrl', ['$scope', '$http', '$templateCache', 'uiGridConstants', function ($scope, $http, $templateCache, uiGridConstants) {

  // Set Bootstrap DatePickerPopup config
  $scope.datePicker = {

      options: {
          formatMonth: 'MM',
          startingDay: 1
      },
      format: "yyyy-MM-dd"
  };

  // Set two filters, one for the 'Greater than' filter and other for the 'Less than' filter
  $scope.showDatePopup = [];
  $scope.showDatePopup.push({ opened: false });
  $scope.showDatePopup.push({ opened: false });

  $templateCache.put('ui-grid/date-cell',
      "<div class='ui-grid-cell-contents'>{{COL_FIELD | date:'yyyy-MM-dd'}}</div>"
  );

  // Custom template using Bootstrap DatePickerPopup
  // Custom template using Bootstrap DatePickerPopup
  $templateCache.put('ui-grid/ui-grid-date-filter',
      "<div class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\" >" +
          "<input type=\"text\" uib-datepicker-popup=\"{{datePicker.format}}\" " +
                  "datepicker-options=\"datePicker.options\" " +
                  "datepicker-append-to-body=\"true\" show-button-bar=\"false\"" +
                  "is-open=\"showDatePopup[$index].opened\" class=\"ui-grid-filter-input ui-grid-filter-input-{{$index}}\"" +
                  "style=\"font-size:1em; width:11em!important\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" " +
                  " aria-label=\"{{colFilter.ariaLabel || aria.defaultFilterLabel}}\" />" +

              "<span style=\"padding-left:0.3em;\"><button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"showDatePopup[$index].opened = true\">" +
                  "<i class=\"glyphicon glyphicon-calendar\"></i></button></span>" +

              "<div role=\"button\" class=\"ui-grid-filter-button\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\">" +
                  "<i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select ui-grid-filter-input-{{$index}}\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || aria.defaultFilterLabel}}\" aria-label=\"{{colFilter.ariaLabel || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"><option value=\"\"></option></select><div role=\"button\" class=\"ui-grid-filter-button-select\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term != null\"><i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div>"
  );

  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {

      if( col.filters[0].term ){

        return 'header-filtered';
      } else {
        return '';
      }
  };

  $scope.filterOptions = {
   filterText: ''
};

    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enableCellEditOnFocus :true,
        enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
        columnDefs: [{ field: "Name", width: 250,enableCellEditOnFocus :true},
                    { field: "Email", width: 250, enableCellEditOnFocus :true},
                    { field: "Phone_number", width: 250, enableCellEditOnFocus :true},
                    { field: "Birthday", width: 250, cellFilter: 'date:\'yyyy-MM-dd\'',
        cellTemplate: 'ui-grid/date-cell',
        filterHeaderTemplate: 'ui-grid/ui-grid-date-filter',
        filters: [
            {
              condition: function(term, value, row, column){
                    if (!term) return true;
                    var valueDate = new Date(value);
                    return valueDate >= term;
                },
              placeholder: 'Greater than or equal'
            },
            {
              condition: function(term, value, row, column){
                    if (!term) return true;
                    var valueDate = new Date(value);
                    return valueDate <= term;
                },
              placeholder: 'Less than or equal'
            }
        ],
        headerCellClass: $scope.highlightFilteredHeader },
                    { field: "Gender", width: 250, enableCellEditOnFocus :true }],
        filterOptions: $scope.filterOptions

    };
    $scope.myData = [{ Name: "Moroni", Email: "moroni@gmail.com", Phone_number:"9943435432", Birthday: "1970-02-13", Gender: "Female" },
                    { Name: "Tiancum", Email: "tiancum@gmail.com", Phone_number:"9453435432", Birthday: "1985-02-12", Gender: "Male"  },
                    { Name: "Jacob", Email: "jacob@gmail.com", Phone_number:"9143435432", Birthday: "1983-08-23", Gender: "Male"  },
                    { Name: "Nephi", Email: "nephi@gmail.com", Phone_number:"9243435432", Birthday: "2010-05-31", Gender: "Female" },
                    { Name: "Enos", Email: "enos@gmail.com", Phone_number:"9343435432", Birthday: "2008-08-03", Gender: "Male"  },
                    { Name: "Moroni", Email: "moroni@hotmail.com", Phone_number:"9443435432", Birthday: "1970-02-13", Gender: "Female"  },
                    { Name: "Tiancum", Email: "tiancum@hotmail.com", Phone_number:"9543435432", Birthday: "1985-02-12", Gender: "Male"  },
                    { Name: "Jacob", Email: "jacob@hotmail.com", Phone_number:"9643435432", Birthday: "1983-08-23", Gender: "Male"  },
                    { Name: "Nephi", Email: "nephi@hotmail.com", Phone_number:"9743435432", Birthday: "2010-05-31", Gender: "Female" },
                    { Name: "Enos", Email: "enos@hotmail.com", Phone_number:"9843435432", Birthday: "2008-08-03", Gender: "Male"  },
                    { Name: "Moroni", Email: "moroni@live.com", Phone_number:"9913435432", Birthday: "1970-02-13", Gender: "Female" },
                    { Name: "Tiancum", Email: "tiancum@live.com", Phone_number:"9923435432", Birthday: "1985-02-12", Gender: "Male"  },
                    { Name: "Jacob", Email: "jacob@live.com", Phone_number:"9933435432", Birthday: "1983-08-23", Gender: "Male"  },
                    { Name: "Nephi", Email: "nephi@live.com", Phone_number:"9955435432", Birthday: "2010-05-31", Gender: "Female"  },
                    { Name: "Enos", Email: "enos@live.com", Phone_number:"9963435432", Birthday: "2008-08-03", Gender: "Male"  }];
}]);
