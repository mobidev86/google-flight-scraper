

require.config({
    paths: {
        'jquery': '/lib/jquery/dist/jquery',
    },
    shim: {
        'jquery': { exports: '$' },
    }
});

require(['jquery'], function ($) {
    $("[data-dismiss='modal']").on('click', function () {
        $(this).parents('.modal').css("display", "none")
    })

    $("[name='inputOrigin']").val($("select.origin").children("option:selected").val());
    $("[name='inputDestination']").val($("select.destination").children("option:selected").val());

    $("select.origin").change(function () {
        var origin = $(this).children("option:selected").val();
        $("[name='inputOrigin']").val(origin)
    });


    $("select.destination").change(function () {
        var destination = $(this).children("option:selected").val();
        $("[name='inputDestination']").val(destination)
    });
});




