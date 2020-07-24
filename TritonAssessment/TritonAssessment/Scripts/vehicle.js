
$(document).ready(function () {

    LoadGridDepositRatingData();
    LoadCapitecCustomersData();

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
                url: "/Vehicles/UpdateCapitecCustomersData",
                data: '{capitecCustomers:' + JSON.stringify(capitecCustomers) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        }
    });

    //Save on the paging
    $('#DepositRatingThrottleGrid').on('page.dt', function () {

        var ThrottleData = [];
        var Id,
            Description,
            ProcessDep,
            ProcessReqStatusId,
            SuccessfulDepCount,
            AllowableDepAccountPerDay,
            ExceptionalRatingId,
            TransAmountLimit,
            CumulativeTransAmountLimitPerDay,
            CumulativeTransBalRemainPerDay,
            AlertLevel,
            UpdateRating,
            DefaultVal;
        var UpdateFlag;

        $("#DepositRatingThrottleGrid").find('tr').not(":first").each(function (data, type, row) {
            var $tds = $(this).find('td');

            if ($.isNumeric($tds.eq(3).text().trim()) && $.isNumeric($tds.eq(4).text().trim()) && $.isNumeric($tds.eq(5).text().trim()) && $.isNumeric($tds.eq(6).text().trim()) && $.isNumeric($tds.eq(7).text().trim()) && $.isNumeric($tds.eq(8).text().trim()) && $.isNumeric($tds.eq(9).text().trim()) && $.isNumeric($tds.eq(10).text().trim())) {
                ThrottleData.push({
                    Id: $tds.eq(0).text().trim(),
                    Description: $tds.eq(1).text().trim(),
                    ProcessDep: $(this).find("#ProcessDep").val(),
                    ProcessReqStatusId: $tds.eq(3).text().trim(),
                    SuccessfulDepCount: $tds.eq(4).text().trim(),
                    AllowableDepAccountPerDay: $tds.eq(5).text().trim(),
                    ExceptionalRatingId: $tds.eq(6).text().trim(),
                    TransAmountLimit: $tds.eq(7).text().trim(),
                    CumulativeTransAmountLimitPerDay: $tds.eq(8).text().trim(),
                    CumulativeTransBalRemainPerDay: $tds.eq(9).text().trim(),
                    AlertLevel: $tds.eq(10).text().trim(),
                    DefaultVal: $(this).find("#DefaultVal").val(),
                    UpdateRating: $(this).find("#UpdateRating").val()
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
                url: "/ThrottleManagement/UpdateDepositRatingThrottleData",
                data: '{ThrottleData:' + JSON.stringify(ThrottleData) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        }

    });
});

function LoadCapitecCustomersData() {

    $("#CapitecCustomersGrid").DataTable({
        "ajax": {
            "url": "/ThrottleManagement/GetCapitecCustomersData",
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
                    "data": "UserReference",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.UserReference + '</div>';
                    }

                },
                {
                    "data": "RatingId",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.RatingId + '</div>';
                    }

                },
                {
                    "data": "VerifiedDepositCount",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.VerifiedDepositCount + '</div>';
                    }
                },
                {
                    "data": "DailyDepositCount",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.DailyDepositCount + '</div>';
                    }
                }

            ]

    });
}

function LoadGridDepositRatingData() {

    $("#DepositRatingThrottleGrid").DataTable({
        "ajax": {
            "url": "/ThrottleManagement/GetDepositRatingThrottleData",
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
                    "data": "Description",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.Description
                            + '</div>';
                    }

                },
                {
                    "data": "ProcessDep",
                    "render": function (data, type, row) {
                        //return '<div class="contentEdit"> ' + row.ProcessDep + '</div>';
                        if (row.ProcessDep === true) {
                            return '<select id=ProcessDep>< option value = "' + true + '" > ' + true + '</option ><option value = "' + true + '"> ' + true + '</option ><option value = "' + false + '"> ' + false + '</option > </select >';
                        }
                        else {
                            return '<select id=ProcessDep>< option value = "' + false + '" > ' + false + '</option ><option value = "' + false + '"> ' + false + '</option ><option value = "' + true + '"> ' + true + '</option > </select >';

                        }
                    }

                },
                {
                    "data": "ProcessReqStatusId",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.ProcessReqStatusId + '</div>';
                    }
                },
                {
                    "data": "SuccessfulDepCount",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.SuccessfulDepCount + '</div>';
                    }

                },
                {
                    "data": "AllowableDepAccountPerDay",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.AllowableDepAccountPerDay + '</div>';
                    }

                },
                {
                    "data": "ExceptionalRatingId",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.ExceptionalRatingId + '</div>';
                    }
                },
                {
                    "data": "TransAmountLimit",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.TransAmountLimit + '</div>';
                    }
                },
                {
                    "data": "CumulativeTransAmountLimitPerDay",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.CumulativeTransAmountLimitPerDay + '</div>';
                    }
                },
                {
                    "data": "CumulativeTransBalRemainPerDay",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.CumulativeTransBalRemainPerDay + '</div>';
                    }
                },
                {
                    "data": "AlertLevel",
                    "render": function (data, type, row) {
                        return '<div class="contentEdit"> ' + row.AlertLevel + '</div>';
                    }
                },
                {
                    "data": "DefaultVal",
                    "render": function (data, type, row) {
                        if (row.DefaultVal === true) {
                            return '<select id=DefaultVal>< option value = "' + true + '" > ' + true + '</option ><option value = "' + true + '"> ' + true + '</option ><option value = "' + false + '"> ' + false + '</option > </select >';
                        }
                        else {
                            return '<select id=DefaultVal>< option value = "' + false + '" > ' + false + '</option ><option value = "' + false + '"> ' + false + '</option ><option value = "' + true + '"> ' + true + '</option > </select >';

                        }
                    }
                },
                {
                    "data": "UpdateRating",
                    "render": function (data, type, row) {
                        if (row.UpdateRating === true) {
                            return '<select id=UpdateRating>< option value = "' + true + '" > ' + true + '</option ><option value = "' + true + '"> ' + true + '</option ><option value = "' + false + '"> ' + false + '</option > </select >';
                        }
                        else {
                            return '<select id=UpdateRating>< option value = "' + false + '" > ' + false + '</option ><option value = "' + false + '"> ' + false + '</option ><option value = "' + true + '"> ' + true + '</option > </select >';

                        }
                    }
                }
            ]

    });
}

function SaveCapitecCustomerData() {

    var capitecCustomers = [];
    var UserReference,
        RatingId,
        VerifiedDepositCount,
        DailyDepositCount;
    var UpdateFlag;

    $("#CapitecCustomersGrid").find('tr').not(":first").each(function (data, type, row) {

        var $tds = $(this).find('td');

        if ($.isNumeric($tds.eq(2).text().trim()) && $.isNumeric($tds.eq(3).text().trim()) && $.isNumeric($tds.eq(4).text().trim())) {

            capitecCustomers.push({
                id: $tds.eq(0).text().trim(),
                UserReference: $tds.eq(1).text().trim(),
                RatingId: $tds.eq(2).text().trim(),
                VerifiedDepositCount: $tds.eq(3).text().trim(),
                DailyDepositCount: $tds.eq(4).text().trim()

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
            url: "/ThrottleManagement/UpdateCapitecCustomersData",
            data: '{capitecCustomers:' + JSON.stringify(capitecCustomers) + '}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data.SuccessData === false) {
                    bootoast.toast({
                        message: 'Error Updating data!',
                        type: 'danger',
                        position: 'top-center'
                    });
                    $("#CapitecCustomersGrid").DataTable().ajax.reload(null, false);
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

                $("#CapitecCustomersGrid").DataTable().ajax.reload(null, false);
            }

        });

    }

    $("#CapitecCustomersGrid").DataTable().ajax.reload(null, false);
}

function SaveDepositRatingThrottleData() {
    var ThrottleData = [];
    var Id,
        Description,
        ProcessDep,
        ProcessReqStatusId,
        SuccessfulDepCount,
        AllowableDepAccountPerDay,
        ExceptionalRatingId,
        TransAmountLimit,
        CumulativeTransAmountLimitPerDay,
        CumulativeTransBalRemainPerDay,
        AlertLevel,
        UpdateRating,
        DefaultVal;
    var UpdateFlag;

    $("#DepositRatingThrottleGrid").find('tr').not(":first").each(function (data, type, row) {
        var $tds = $(this).find('td');

        if ($.isNumeric($tds.eq(3).text().trim()) && $.isNumeric($tds.eq(4).text().trim()) && $.isNumeric($tds.eq(5).text().trim()) && $.isNumeric($tds.eq(6).text().trim()) && $.isNumeric($tds.eq(7).text().trim()) && $.isNumeric($tds.eq(8).text().trim()) && $.isNumeric($tds.eq(9).text().trim()) && $.isNumeric($tds.eq(10).text().trim())) {
            ThrottleData.push({
                Id: $tds.eq(0).text().trim(),
                Description: $tds.eq(1).text().trim(),
                ProcessDep: $(this).find("#ProcessDep").val(),
                ProcessReqStatusId: $tds.eq(3).text().trim(),
                SuccessfulDepCount: $tds.eq(4).text().trim(),
                AllowableDepAccountPerDay: $tds.eq(5).text().trim(),
                ExceptionalRatingId: $tds.eq(6).text().trim(),
                TransAmountLimit: $tds.eq(7).text().trim(),
                CumulativeTransAmountLimitPerDay: $tds.eq(8).text().trim(),
                CumulativeTransBalRemainPerDay: $tds.eq(9).text().trim(),
                AlertLevel: $tds.eq(10).text().trim(),
                DefaultVal: $(this).find("#DefaultVal").val(),
                UpdateRating: $(this).find("#UpdateRating").val()
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
            url: "/ThrottleManagement/UpdateDepositRatingThrottleData",
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