(function() {
    'use strict';
    angular.module("app", []).controller("TableCreatorController", TableCreatorController);

    function TableCreatorController($scope, $compile) {

        var vm = this,
            tableHtmlTag = document.getElementById('Table').children[0],
            colSpanValue = 1;

        function addBlueStyles(newCell) {
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
            return tableHtmlTag.rows[n];
        }

        function getLastCell(row) {
            return row.cells[row.cells.length - 1];
        }

        function appendButtons(rowNumber) {
            var buttons = [],
                htmlButtons = [
                    `<button ng-click="tableController.addCell(${rowNumber})">Add Cell</button>`,
                    `<button ng-click="tableController.deleteCell(${rowNumber})">Delete Cell</button>`
                ];
            angular.forEach(htmlButtons, function(button, key) {
                buttons.push($compile(button)($scope));
            });

            $('.buttons').append($('<div class="' + rowNumber + '">').append(buttons));

        }

        function updateColSpan(n) {
            if (!n) {
                n = colSpanValue;
            }
            if (tableHtmlTag.tHead && tableHtmlTag.tHead.childElementCount) {
                $(tableHtmlTag.tHead).find('th')[0].colSpan = n;
            }
            if (tableHtmlTag.tFoot && tableHtmlTag.tFoot.childElementCount) {
                $(tableHtmlTag.tFoot).find('td')[0].colSpan = n;
            }
        }

        vm.addTableHead = function() {
            var headerRow = tableHtmlTag.createTHead().insertRow(0),
                th = document.createElement('th');
            th.innerHTML = "<b>This is a table header</b>";
            headerRow.appendChild(th);
            $(th).attr("contentEditable", true);
            addBlueStyles(th);
            updateColSpan();
        };

        vm.addTableFooter = function() {

            var footerRow = tableHtmlTag.createTFoot().insertRow(0),
                td = document.createElement('td');
            td.innerHTML = "<b>This is a table footer</b>";
            footerRow.appendChild(td);
            $(td).attr("contentEditable", true);
            (tableHtmlTag.rows.length % 2 === 0) ? addGreyStyles(td) : addBlueStyles(td);
            updateColSpan();
            // appendButtons();
        };

        vm.newRowWithCell = function() {
            var rowLength = tableHtmlTag.rows.length,
                newCell = tableHtmlTag.insertRow(rowLength).insertCell(0);

            (rowLength % 2 === 0) ? addBlueStyles(newCell) : addGreyStyles(newCell);

            addDefaultText(newCell);
            appendButtons(rowLength);
        };

        vm.addCell = function(rowNumber) {

            var currentRow = getCurrentRow(rowNumber),
                newCell = currentRow.insertCell(getLastCell(currentRow));

            if (currentRow.cells.length > colSpanValue) {
                colSpanValue = currentRow.cells.length;
                updateColSpan(colSpanValue);
            }

            (rowNumber % 2 === 0) ? addBlueStyles(newCell) : addGreyStyles(newCell);
            addDefaultText(newCell);
        };

        vm.deleteCell = function(rowNumber) {
            var currentRow = getCurrentRow(rowNumber),
                lastCell = getLastCell(currentRow),
                newCell = currentRow.deleteCell(lastCell);

            if (lastCell.cellIndex === -1) {
                $('.' + rowNumber).remove();
            }
        };

        vm.showHtml = function() {
            var tableHtml = $('#Table');
            tableHtml.find('*').removeAttr('class');
            $('.pre-code').text(($(tableHtml).html()));
        };
    }
})();