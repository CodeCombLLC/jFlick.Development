router.get('/home/index', function (req, res, next) {
    //alert('Hello world!');
});

router.get('/home/page', function (req, res, next) {
    //alert('name=' + req.query.name);
    res.find('#btnCalc').click(function () {
        var a = parseInt(res.find('#txtA').val());
        var b = parseInt(res.find('#txtB').val());
        alert(a + b);
    });
});