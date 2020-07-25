
$(document).ready(function () {

    LoadVehicleData();
    LoadWayBillsData();

    $('#VehiclesGrid').on('click', '.contentEdit', function (data, type, row) {
        event.preventDefault();
        //make div editable
        $(this).closest('.contentEdit').attr('contenteditable', 'true');

    });

    $('#WayBillsGrid').on('click', '.contentEdit', function (data, type, row) {
        event.preventDefault();
        //make div editable
        $(this).closest('.contentEdit').attr('contenteditable', 'true');

    });


    //Save on the paging
    $('#WayBillsGrid').on('page.dt', function () {

        var wayBills = [];
        var Weight,
            NoOfParcels,
            VehicleId;

        var UpdateFlag;

        $("#WayBillsGrid").find('tr').not(":first").each(function (data, type, row) {

            var $tds = $(this).find('td');

            if ($.isNumeric($tds.eq(2).text().trim()) && $.isNumeric($tds.eq(3).text().trim()) && $.isNumeric($tds.eq(4).text().trim())) {

                wayBills.push({
                    id: $tds.eq(0).text().trim(),
                    Weight: $tds.eq(1).text().trim(),
                    NoOfParcels: $tds.eq(2).text().trim(),
                    VehicleId: $tds.eq(3).text().trim(),
                   
                });
                UpdateFlag = true;
            }
            else {
                bootoast.toast({
                    message: 'Invalid Data, Please Correct!',
                    type: 'danger',
                    position: 'top-center'
                });
                UpdateFlag = false;
                return false;
            }
        });

        if (UpdateFlag === true) {
            $.ajax({
                type: "POST",
                url: "/Vehicles/InsertWayBillData",
                data: '{wayBillData:' + JSON.stringify(wayBills) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        }
    });

    //Save on the paging
    $('#VehiclesGrid').on('page.dt', function () {

        var VehicleData = [];
        var Id,
            Name,
            Type,
            Branch;
        var UpdateFlag;

        $("#VehiclesGrid").find('tr').not(":first").each(function (data, type, row) {
            var $tds = $(this).find('td');

            if ($.isNumeric($tds.eq(1).text().trim()) && $.isNumeric($tds.eq(2).text().trim()) && $.isNumeric($tds.eq(3).text().trim())) {
                VehicleData.push({
                    Id: $tds.eq(0).text().trim(),
                    Name: $tds.eq(1).text().trim(),
                    Type: $tds.eq(2).text().trim(),
                    Branch: $tds.eq(3).text().trim()
                });
                UpdateFlag = true;
            }
            else {
                bootoast.toast({
                    message: 'Invalid Data, Please Correct!',
                    type: 'danger',
                    position: 'top-center'
                });
                UpdateFlag = false;
                return false;
            }


        });

        if (UpdateFlag === true) {
            $.ajax({
                type: "POST",
                url: "/Vehicles/UpdateVehicleData",
                data: '{ThrottleData:' + JSON.stringify(ThrottleData) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        }

    });
});

function LoadVehicleData() {

    $("#VehiclesGrid").DataTable({
        "ajax": {
            "url": "/Vehicles/Vehicles",
            "type": "POST",
            "datatype": "json"
        },

        "stateSave": true,
        "columns":
            [
                {
                    "data": "id"
                },
                {
                    "data": "Name",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.Name + '</div>';
                    }

                },
                {
                    "data": "Type",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.Type + '</div>';
                    }

                },
                {
                    "data": "Branch",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.Branch + '</div>';
                    }
                }
            ]

    });
}

function LoadWayBillsData() {

    $("#WayBillsGrid").DataTable({
        "ajax": {
            "url": "/WayBills/WayBills",
            "type": "POST",
            "datatype": "json"
        },

        "stateSave": true,
        "columns":
            [
                {
                    "data": "Id"
                },
                {
                    "data": "Weight",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.Weight
                            + '</div>';
                    }

                },
                {
                    "data": "NoOfParcels",
                    //"render": function (data, type, row) {
                    //    //return '<div class="contentEdit"> ' + row.ProcessDep + '</div>';
                    //    if (row.ProcessDep === true) {
                    //        return '<select id=ProcessDep>< option value = "' + true + '" > ' + true + '</option ><option value = "' + true + '"> ' + true + '</option ><option value = "' + false + '"> ' + false + '</option > </select >';
                    //    }
                    //    else {
                    //        return '<select id=ProcessDep>< option value = "' + false + '" > ' + false + '</option ><option value = "' + false + '"> ' + false + '</option ><option value = "' + true + '"> ' + true + '</option > </select >';

                    //    }
                    //}

                },
                {
                    "data": "VehicleId",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.VehicleId + '</div>';
                    }
                }
            ]

    });
}

function SaveVehicleData() {

    var VehicleData = [];
    var Id,
        Name,
        Type,
        Branch;
    var UpdateFlag;

    $("#VehiclesGrid").find('tr').not(":first").each(function (data, type, row) {

        var $tds = $(this).find('td');

        if ($.isNumeric($tds.eq(1).text().trim()) && $.isNumeric($tds.eq(2).text().trim()) && $.isNumeric($tds.eq(3).text().trim())) {

            VehicleData.push({
                id: $tds.eq(0).text().trim(),
                Name: $tds.eq(1).text().trim(),
                Type: $tds.eq(2).text().trim(),
                Branch: $tds.eq(3).text().trim()

            });
            UpdateFlag = true;
        }
        else {
            bootoast.toast({
                message: 'Error Updating data, Invalid Data!',
                type: 'danger',
                position: 'top-center'
            });
            UpdateFlag = false;
            return false;
        }
    });

    if (UpdateFlag === true) {
        $.ajax({
            type: "POST",
            url: "/Vehicles/UpdateVehicleData",
            data: '{VehicleData:' + JSON.stringify(VehicleData) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.SuccessData === false) {
                    bootoast.toast({
                        message: 'Error Updating data!',
                        type: 'danger',
                        position: 'top-center'
                    });
                    $("#VehiclesGrid").DataTable().ajax.reload(null, false);
                }
                if (data.SuccessData === true) {
                    bootoast.toast({
                        message: 'Successfully Updated Data!',
                        type: 'success',
                        position: 'top-center'

                    });
                }
            },
            error: function () {

                bootoast.toast({
                    message: 'Error Updating data!',
                    type: 'danger',
                    position: 'top-center'
                });

                $("#VehiclesGrid").DataTable().ajax.reload(null, false);
            }

        });

    }

    $("#VehiclesGrid").DataTable().ajax.reload(null, false);
}

function SaveWayBillData() {
    var wayBills = [];
    var Weight,
        NoOfParcels,
        VehicleId;

    var UpdateFlag;

    $("#WayBillsGrid").find('tr').not(":first").each(function (data, type, row) {
        var $tds = $(this).find('td');

        if ($.isNumeric($tds.eq(2).text().trim()) && $.isNumeric($tds.eq(3).text().trim()) && $.isNumeric($tds.eq(4).text().trim())) {

            wayBills.push({
                id: $tds.eq(0).text().trim(),
                Weight: $tds.eq(1).text().trim(),
                NoOfParcels: $tds.eq(2).text().trim(),
                VehicleId: $tds.eq(3).text().trim(),

            });
            UpdateFlag = true;
        }
        else {
            bootoast.toast({
                message: 'Invalid Data, Please Correct!',
                type: 'danger',
                position: 'top-center'
            });
            UpdateFlag = false;
            return false;
        }


    });

    if (UpdateFlag === true) {
        $.ajax({
            type: "POST",
            url: "/Vehicles/InsertWayBillData",
            data: '{ThrottleData:' + JSON.stringify(ThrottleData) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.SuccessData === false) {
                    bootoast.toast({
                        message: 'Error Updating data!',
                        type: 'danger',
                        position: 'top-center'
                    });
                    $("#DepositRatingThrottleGrid").DataTable().ajax.reload(null, false);
                }
                if (data.SuccessData === true) {
                    bootoast.toast({
                        message: 'Successfully Updated Data!',
                        type: 'success',
                        position: 'top-center'

                    });
                }
            },
            error: function () {

                bootoast.toast({
                    message: 'Error Updating data!',
                    type: 'danger',
                    position: 'top-center'
                });

                $("#DepositRatingThrottleGrid").DataTable().ajax.reload(null, false);
            }

        });
    }

    $("#DepositRatingThrottleGrid").DataTable().ajax.reload(null, false);
}