var base = {
    admin: [
        {
            firstName: 'გიორგი',
            lastName: 'პარუნოვი',
            userName: 'admin',
            password: 'admin'
        }
    ],
    student: [
        {
            firstName: 'მიხეილ',
            lastName: 'გიგაური',
            marks: ['1', '1', '1', '1', '1'],
            attendance: ['11.11.18', '12.11.18', '13.11.18', '14.11.18', '15.11.18', '16.11.18']
        },
        {
            firstName: 'ნიკა',
            lastName: 'ნიკა',
            marks: ['2', '2', '2', '2', '2'],
            attendance: ['11.11.18', '12.11.18', '13.11.18', '14.11.18', '15.11.18', '16.11.18']
        }
    ],
    error: {
        promptError1: 'გთხოვთ შეიყვანეთ მხოლოდ ქართული ასოები!',
        promptError2: 'მოხდა შეცდომა, გთხოვთ სცადეთ თავიდან',
        promptError3: 'გთხოვთ შეიყვანოთ მხოლოდ რიცხები 0 - 10 ჩათვლით',
        promptError4: 'გთხოვთ შეიყვანოთ სწორი სახელი და პაროლი'
    },
    func: {
        studentAdd: function() {
            var firstName = prompt('შეიყვანეთ სტუდენტის სახელი'),
                lastName = prompt('შეიყვანეთ სტუდენტის გვარი');
            
            if( /^[ა-ჰ,' ']+$/.test(firstName) && /^[ა-ჰ,' ']+$/.test(lastName) ) {
                var studentObject = {
                    'firstName': firstName,
                    'lastName': lastName,
                    'marks' : ['-', '-', '-', '-', '-'],
                    'attendance': []
                };
                // Sends Student to studentBase
                base.student.push(studentObject);

                // Functions which happens on StudentAdd
                base.func.drawStudent();
                base.func.drawRow();
                base.func.studentsLength();
                base.func.markAdd();
            } else if( (firstName || lastName) == null || (firstName || lastName) == "") {
                alert(base.error.promptError2)
            } else if( /^[a-zA-Z]+$/.test(firstName || lastName) ) {
                alert(base.error.promptError1);
            } else {
                alert(base.error.promptError2)
            }
        },
        drawStudent: function() {
            var studentList = document.getElementById('studentList');
                studentList.innerHTML = '';

            for(var i=0; i < base.student.length; i++) {
                studentList.innerHTML += 
                '<li class="nav__list-item fl_jus-bet" list-id="' + i + '" onclick="base.func.deleteCurr(' + i + ')">' +
                    '<span class="nav__list-link">' + 
                    base.student[i].firstName + ' ' + base.student[i].lastName + '</span>' +
                    '<span class="nav__delate-single"><i class="fas fa-times"></i></span>' +
                '</li>';
            }
        },
        drawRow: function() {
            var rowList = document.getElementById('rowList');
                rowList.innerHTML = '';
                
            for(var i=0; i < base.student.length; i++) {
                var tableRow = document.createElement('tr');

                rowList.appendChild(tableRow);
                tableRow.className = 'table__body fl_jus-bet';
                tableRow.setAttribute('row-id', i);

                for(var j=0; j < 5; j++) {
                    var tableData = document.createElement('td');
                    var tableMark = document.createTextNode(base.student[i].marks.slice(j, j+1));

                    if(tableMark.nodeValue < 5) {
                        tableData.style.backgroundColor = '#e74c3c';
                    } else if(tableMark.nodeValue >= 5 && tableMark.nodeValue <= 7) {
                        tableData.style.backgroundColor = '#f1c40f';
                    } else if(tableMark.nodeValue > 7) {
                        tableData.style.backgroundColor = '#44bd32';
                    }

                    tableRow.appendChild(tableData);
                    tableData.setAttribute('data-id', j);
                    tableData.appendChild(tableMark);
                }
            }
        },
        markAdd: function() {
            var td = document.querySelectorAll('td');
            
            for(var i=0; i < td.length; i++) {
                td[i].addEventListener("click", function() {
                    var rowId = this.parentElement.getAttribute('row-id');
                    var dataId = this.getAttribute('data-id');
                    var mark = prompt('შეიყვანეთ ქულა');

                    if(mark <= 10 && mark > 0 && mark !== null && mark !== '' && mark !== undefined) {
                        base.student[rowId].marks.fill(mark, dataId, +dataId+1);
                        if(mark < 5) {
                            this.innerHTML = mark;
                            this.style.backgroundColor = '#e74c3c';
                        } else if(mark >= 5 && mark <= 7) {
                            this.innerHTML = mark;
                            this.style.backgroundColor = '#f1c40f';
                        } else if(mark > 7) {
                            this.innerHTML = mark;
                            this.style.backgroundColor = '#44bd32';
                        }
                    } else if(mark == null || mark == '' || mark == undefined) {
                        base.student[rowId].marks.fill(String(base.student[rowId].marks.slice(dataId, +dataId+1)), dataId, +dataId+1);
                    } else{
                        alert(base.error.promptError3);
                    }
                    // console.log(base.student[rowId].marks);
                    base.func.avarageNum();
                });
            }
        },
        deleteCurr: function(x) {
            base.student[x] = undefined;
            var arrayCopy = [];
            
            for(let i = 0;i<base.student.length;i++){
                if (base.student[i] == undefined) {
                    continue;
                } else {
                    arrayCopy.push(base.student[i]);
                }
            }

            base.student = arrayCopy;
            base.func.drawStudent();
            base.func.drawRow();
            base.func.studentsLength();
            base.func.avarageNum();
        },
        deleteAll: function() {
            studentList.innerHTML = '';
            rowList.innerHTML = '';
            base.student.splice(0, base.student.length);
            base.func.studentsLength();
            base.func.markAdd();
            base.func.avarageNum();
            
        },
        studentsLength: function() {
            var length = document.getElementById('studentsLenght');
                length.innerHTML = base.student.length;
        },
        avarageNum: function() {
            var someNum = 0;
            var someNumDevide = 0;
            var marksAvarage = document.getElementById('marksAvarage');

            for(var i = 0; i < base.student.length;i++){
                for(var j = 0; j <base.student[i].marks.length;j++){
                    if(base.student[i].marks[j] == '-') {
                        continue;
                    } else {
                        var x = +base.student[i].marks[j];
                        someNum += x;
                        someNumDevide++;
                    }
                }
            }

            if(x == undefined || x == NaN) {
                marksAvarage.innerHTML = 0;
            } else {
                marksAvarage.innerHTML = Math.round(someNum/someNumDevide);
            }
        },
        adminLogin: function() {
            var fullName = document.querySelector('.login__username');
            var button = document.getElementById('loginBtn');
            var loginForm = document.getElementById('loginForm');

            function userNameValue(){
                return input = document.getElementById('username').value;
            }
            function passwordValue(){
                return input = document.getElementById('password').value;
            }
            
            button.addEventListener('click', function() {
                if(userNameValue() == base.admin[0].userName && passwordValue() == base.admin[0].password){
                    loginForm.style.display = 'none';
                }else{
                    alert(base.error.promptError4);
                }
            });

            fullName.innerHTML = base.admin[0].firstName + ' ' + base.admin[0].lastName;
        }

    }
}

// Calls Functions on Site
base.func.drawStudent();
base.func.drawRow();
base.func.studentsLength();
base.func.markAdd();
base.func.avarageNum();
base.func.adminLogin();