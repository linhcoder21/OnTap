var express = require('express');
const {render} = require("ejs");
var router = express.Router();

var db = 'mongodb+srv://linhluong:Linh212002@cluster0.9wb71.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const mongoose = require('mongoose');
const  { Schema } = mongoose;
 mongoose.connect(db).
catch(error => {
   if(error){
       console.log("co loi xay ra" + error.message)
   }
});;

const Student = new Schema({
    email : String,
    firstName : String,
    lastName : String,
    password : String
})

const SV = mongoose.model('Student',Student)

/* GET home page. */
router.get('/', async function (req, res, next) {
    //lay danh sach
                var sinhviens = await SV.find({});

    res.render('index', {data: sinhviens});
});
//xoa
router.get('/xoa', async function (req, res, next) {

    await SV.deleteOne({_id : req.query.id})

  //quay ve trang chu
    res.redirect('/');
});

//sua
router.get('/sua', async function (req, res, next) {


    res.render('index', {data: sinhviens});
});

router.get('/car', function(req, res, next) {
  var data = 'Xin chao kiem tra thu'
  res.render('car', { title: 'Express' ,  duLieu : data });
});

router.post('/insertUser',function (req,res) {
    console.log("insertUser")
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;

    console.log(email + " - " + firstname + " - " + lastname + " - " + password)
    var data = email + " - " + firstname + " - " + lastname + " - " + password

    //viet cau lenh them
    //b1:định nghĩa khung của model - Sinh vien (id, name, email,....)-- Schema

    //b2:gọi câu lệnh insert với dữ liệu của mk


    const sinhVienMoi = new SV({
        email: email,
        firstName: firstname,
        lastName: lastname,
        password: password
    })

    sinhVienMoi.save(function (error) {
        if (error) {
            res.render('index', {message: "Them khong thanh cong !!!" + error.message})
        } else {
            res.render('index', {message: "Them thanh cong !!!"});
        }
    })


    var  mang = [3,4,5,4,6,3,7,9,5,2]
    var sinhVien = { name :  'Linh', tuoi : 19}
    // res.render('car',{title: 'Express', duLieu: data, mangSo : mang, student : sinhVien});

});
module.exports = router;
