(function() {
    'use strict';
    angular.module("app", []).controller("TableCreatorController", TableCreatorController);

    function TableCreatorController($scope, $compile) {

        var vm = this,
            tableHtmlTag = document.getElementById('Table').children[0];

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
                'background-color': '#cccccc',
                'font-weight': 'bold',
                'font-size': '14px',
                'color': '#000'
            }).attr("contentEditable", true);
        }

        function addDefaultText(newCell) {
            newCell.appendChild(document.createTextNode('Cell'));
        }

        function getCurrentRow(n) {
            return tableHtmlTag.rows[n]
        }

        function getLastCell(row) {
            return row.cells[row.cells.length - 1]
        }

        function appendButtons(rowNumber) {
            var buttons = [],
            htmlButtons = [
                `<button class="inline-block" ng-click="tableController.addCell(${rowNumber})">Add Cell</button>`, 
                `<button class="inline-block" ng-click="tableController.deleteCell(${rowNumber})">Delete Cell</button>`
            ];
            angular.forEach(htmlButtons, function(button, key) {
                buttons.push($compile(button)($scope))
            });

            $('.buttons').append($("<div/>").append(buttons));
        }

        vm.newRowWithCell = function() {
            var rowLength = tableHtmlTag.rows.length,
                newCell = tableHtmlTag.insertRow(rowLength).insertCell(0);

            (rowLength % 2 === 0) ? addBlueStyle(newCell) : addGreyStyles(newCell);
            
            addDefaultText(newCell);
            appendButtons(rowLength);
        };

        vm.addCell = function(rowNumber) {
            var currentRow = getCurrentRow(rowNumber),
                newCell = currentRow.insertCell(getLastCell(currentRow));

            (rowNumber % 2 === 0) ? addBlueStyle(newCell) : addGreyStyles(newCell);
            addDefaultText(newCell);
        };


        vm.deleteCell = function(rowNumber) {
            var currentRow = getCurrentRow(rowNumber),
                lastCell = getLastCell(currentRow),
                newCell = currentRow.deleteCell(lastCell);
        };

        vm.showHtml = function() {
            var tableHtml = $('#Table');
            tableHtml.find('*').removeAttr('class');
            $('.pre-code').text(($(tableHtml).html()));
        };
    }
})();