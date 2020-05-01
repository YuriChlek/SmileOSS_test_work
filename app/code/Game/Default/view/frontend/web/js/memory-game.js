define([],
    function () {
        'use strict';
        return function () {
            var game = {
                wrapper: document.querySelector('.game-board-wrapper'),
                parentWrapper: document.querySelector('.game-wrapper'),
                movesCountElem: document.createElement('span'),
                loaderBlind: document.createElement('div'),
                spinner: document.createElement('span'),
                levelsImagesNames: [
                    'first-level.jpg',
                    'second-level.jpg',
                    'third-level.jpg',
                    'fourth-level.jpg',
                    'fifth-level.jpg',
                    'sixth-level.jpg'
                ],
                level: 1,
                cellContent: [],
                numberOfCells: [12, 16, 20, 24, 28, 32],
                numberOfClicks: 0,
                numberOfMoves: 0,
                rightMoves: 0,
                allLevelsMoves: [],
                prevElement: '',
                buttonsFlag: true,
                moveFlag: true,
                build: function () {
                    if (localStorage.getItem('level')) {
                        this.level = +localStorage.getItem('level');
                        this.allLevelsMoves = JSON.parse(localStorage.getItem('allLevelsMoves'));
                        this.createGameBoard();
                        this.createLoader();
                        return 0;
                    }
                    this.createGameBoard();
                    this.createLoader();
                    this.saveGame();
                },
                getCellContent: function () {
                    for (var i = 0; i < this.numberOfCells[this.level - 1]; i++) {
                        this.cellContent[i] = 1 + Math.floor(Math.random() * (this.numberOfCells[this.level - 1] / 2));
                        if (this.cellContent.filter(item => item === this.cellContent[i]).length > 2) {
                            i--;
                        }
                    }
                },
                createGameBoard: function () {
                    var parentBoard = this.createElem('ul', 'game-board');
                    this.getCellContent();
                    parentBoard.style.backgroundImage = "url(\'/pub/static/frontend/AutoSound/default/ru_Ru/images/" + this.levelsImagesNames[this.level - 1] + "\')";
                    for (var i = 0; i < this.numberOfCells[this.level - 1]; i++) {
                        var cell = this.createElem('li', 'cell', this.cellContent[i]);
                        cell.setAttribute('content', this.cellContent[i]);
                        cell.addEventListener('click', function (event) {
                            this.moveVerify(event, this.movesCounter());
                        }.bind(this));
                        parentBoard.appendChild(cell);
                    }
                    this.wrapper.prepend(parentBoard);
                    this.createButtons(this.parentWrapper);
                },
                createElem: function (tagName, elementClass, content) {
                    var elem = document.createElement(tagName);
                    elem.classList.add(elementClass);
                    elem.innerHTML = (content || '');
                    return elem;
                },
                movesCounter: function () {
                    if (this.prevElement && !(this.numberOfClicks % 2) && this.prevElement.classList.contains('active')) {
                        this.moveFlag = false;
                        return 0;
                    }
                    this.moveFlag = true;
                    this.numberOfClicks++;
                    this.numberOfMoves = Math.floor(this.numberOfClicks / 2);
                    this.moveCounterContent();
                },
                moveVerify: function (event) {
                    if (!this.prevElement) {
                        event.target.classList.add('active');
                        this.prevElement = event.target;
                    } else if (this.moveFlag && this.prevElement && this.prevElement.getAttribute('content') === event.target.getAttribute('content')) {
                        this.rightMoves++;
                        this.moveCounterContent();
                        event.target.classList.add('active');
                        setTimeout(function () {
                            this.prevElement.classList.add('hide');
                            event.target.classList.add('hide');
                            this.prevElement.classList.remove('active');
                            event.target.classList.remove('active');
                            this.prevElement = '';
                        }.bind(this), 1000)
                    } else if (this.moveFlag && this.prevElement.getAttribute('content') !== event.target.getAttribute('content')) {
                        event.target.classList.add('active');
                        setTimeout(function () {
                            this.prevElement.classList.remove('active');
                            event.target.classList.remove('active');
                            this.prevElement = '';
                        }.bind(this), 2000);
                    }
                },
                nextLevel: function () {
                    if (this.rightMoves === this.numberOfCells[this.level - 1] / 2 && this.level <= this.numberOfCells.length) {
                        this.allLevelsMoves[this.level - 1] = this.numberOfMoves;
                        this.level++;
                        this.wrapper.innerHTML = '';
                        this.rightMoves = 0;
                        this.numberOfMoves = 0;
                        this.numberOfClicks = 0;
                        this.loaderInclude();
                        this.saveGame();
                        setTimeout(function () {
                            this.moveCounterContent();
                            this.createGameBoard();
                        }.bind(this), 500);
                    } else return 0;
                },
                prevLevel: function () {
                    if (this.level > 1) {
                        this.level--;
                        this.createGameBoard();
                    } else return 0;
                },
                createButtons: function (elem) {
                    if (this.buttonsFlag) {
                        var nextButton = this.createElem('button', 'next-level', 'Next level >>>'),
                            prevButton = this.createElem('button', 'next-level', '<<< Prev level'),
                            buttonsWrapper = this.createElem('div', 'game-buttons-wrapper');
                        nextButton.addEventListener('click', function () {
                            this.nextLevel();
                        }.bind(this));
                        prevButton.addEventListener('click', function () {
                            this.prevLevel();
                        }.bind(this));
                        buttonsWrapper.appendChild(prevButton);
                        buttonsWrapper.appendChild(nextButton);
                        elem.appendChild(buttonsWrapper);
                        this.buttonsFlag = false;
                        this.createCounters(elem);
                    }
                    return elem;
                },
                createCounters: function (elem) {
                    var countRowTop = this.createElem('p', 'top-row'),
                        countRowTopText = this.createElem('span', 'text', 'Number of moves');
                    countRowTop.appendChild(countRowTopText);
                    countRowTop.appendChild(this.movesCountElem);
                    elem.appendChild(countRowTop);
                    this.moveCounterContent();
                    return elem;
                },
                moveCounterContent: function () {
                    this.movesCountElem.innerHTML = this.numberOfMoves;
                },
                createLoader: function () {
                    this.loaderBlind.classList.add('loader');
                    this.spinner.classList.add('spinner-loader');
                    this.loaderBlind.appendChild(this.spinner);
                    this.parentWrapper.appendChild(this.loaderBlind);
                },
                loaderInclude: function () {
                    this.loaderBlind.classList.add('active');
                    setTimeout(function () {
                        this.loaderBlind.classList.remove('active');
                    }.bind(this), 1000);
                },
                creteRecordsTable: function () {
                    var tableWrap = this.createElem('table', 'record-table'),
                        tableCaption = this.createElem('caption', 'table-caption', 'Рекорды уровней');
                    tableWrap.appendChild(tableCaption);
                    for (var i = 0; i < 2; i++) {
                        var row = this.createElem('tr', 'table-row');
                        for (var j = 0; j < this.numberOfCells.length; j++) {
                            var cellContent = (this.cellContent) ?  this.cellContent : '-',
                                tableCell = this.createElem('td', 'table-cell', cellContent);
                            row.appendChild(tableCell);
                        }
                    }
                },
                saveGame: function () {
                    localStorage.setItem('level', this.level);
                    localStorage.setItem('allLevelsMoves', JSON.stringify(this.allLevelsMoves));
                },
                saveNumberOfMoves: function () {
                    if (!this.allLevelsMoves[this.level - 1] || (this.allLevelsMoves[this.level - 1] > this.numberOfMoves)) {
                        this.allLevelsMoves[this.level - 1] = this.numberOfMoves;
                    }
                }
            };
            return game.build();
        }
    });
