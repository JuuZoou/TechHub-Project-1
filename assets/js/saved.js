for(var i=0; i < base.student.length; i++) {
    rowList.innerHTML += 
    '<tr class="table__body fl_jus-bet" row-id="'+ i +'">' + 
        '<td data-id="0">'+ base.student[i].marks.slice(0, 1) +'</td>' +
        '<td data-id="1">'+ base.student[i].marks.slice(1, 2) +'</td>' +
        '<td data-id="2">'+ base.student[i].marks.slice(2, 3) +'</td>' +
        '<td data-id="3">' + base.student[i].marks.slice(3, 4) + '</td>' +
        '<td data-id="4">' + base.student[i].marks.slice(4, 5) + '</td>' +
    '</tr>';
}

{/* <div class="errorPopup" id="popUp" style="top:-50%"></div>

.errorPopup{
    position: absolute;
    top: -50%;
    left: 50%;
    z-index: 11;
    font-size: 16px;
    transform: translate(-50%, -50%);
    padding: 50px 40px;
    border-radius: 8px;
    border: 1px solid #d08444;
    background-color: #fff;
    transition: 1.5s ease-out;
}

errorMsg: function(e) {
    var popUp = document.getElementById('popUp');

    popUp.innerHTML = e;
    popUp.style.top = '40%';
    setTimeout(function(){popUp.style.top = '-50%'}, 2000);
} */}