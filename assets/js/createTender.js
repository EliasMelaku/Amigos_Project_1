// JavaScript Document
import Localbase from 'localbase'
const noticeColl = new Localbase("createNotice")
const userId = randomNumber(99);
/*   ======| DOM elements |======    */
const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", submitNotice);


/*     Functions         */

function randomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

function submitNotice() {
    noticeColl.collection('tenders').add({
        id: userId,
        noticeTitle: document.getElementById("noticeTitle").value,
        noticeDetail: document.getElementById("noticeDetail").value,
        noticeOrg: document.getElementById('noticeOrganization').value,
        noticeDescription: document.getElementById('noticeDescription').value,
        fieldOfWork: document.getElementById('fieldOfWork').value,
        typeOfNotice: document.getElementById('typeOfNotice').value,
        deadline: document.getElementById('deadline').value,
        paymentCondition: function() {
            var condition = document.getElementsByName('paymentCondition');
            for (let i = 0; i < condition.length; i++) {
                if (condition[i].checked) {
                    return condition[i];
                }
            }
        },
        telephone: document.getElementById('telephone').value,
        email: document.getElementById('email').value,
        fileAtt: document.getElementById('fileAttachment').files[0].name

    })
}