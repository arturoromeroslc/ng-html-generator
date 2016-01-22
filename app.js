(function() {
    'use strict';
    angular.module("app", []).controller("TableCreatorController", TableCreatorController);

    function TableCreatorController($scope, $compile) {

        var vm = this,
            tableHtmlTag = document.getElementById('Table').children[0];

        vm.addRow = function() {
            var rowCount = tableHtmlTag.rows.length,
                newRow = tableHtmlTag.insertRow(rowCount),
                newCell = newRow.insertCell(0);

            (rowCount % 2 === 0) ? addBlueStyle(newCell) : addGreyStyles(newCell);

            addDefaultText(newCell);
            addButton(rowCount);
        };

        vm.addCell = function(n) {
            var row = tableHtmlTag.rows[n],
                lastCell = row.cells[row.cells.length - 1],
                newCell = row.insertCell(lastCell);

            (n % 2 === 0) ? addBlueStyle(newCell) : addGreyStyles(newCell);

            addDefaultText(newCell);
        };

        vm.deleteCell = function(n) {
            var row = tableHtmlTag.rows[n],
                lastCell = row.cells[row.cells.length - 1],
                newCell = row.deleteCell(lastCell);
        };

        vm.showHtml = function() {
            var tableHtml = $('#Table');
            tableHtml.find('*').removeAttr('class');
            $('.pre-code').text(($(tableHtml).html()));
        };

        function addButton(n) {
            var htmlButton = '<button type="button" ng-click="tableController.addCell(' + n + ')">Add Cell</button>',
                compiledButton = $compile(htmlButton)($scope);
            angular.element($('.buttons')).append(compiledButton);
        }

        function addDefaultText(newCell) {
            newCell.appendChild(document.createTextNode('Cell'));
        }

        function addBlueStyle(newCell) {
            $(newCell).css({
                'background-color': '#02235c',
                'text-align': 'left',
                'color': '#fff',
                'font-size': '14px',
                'font-weight': 'bold'
            }).attr("contentEditable", true);
        }

        function addGreyStyles(newCell) {
            $(newCell).css({
                'font-weight': 'bold',
                'font-size': '12px',
                'color': '#000'
            }).attr("contentEditable", true);
        }
    }
})();