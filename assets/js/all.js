$(() => {
    validate_effects()
    $("#result_all").val(calc_flag())
    $("#result_variant").val(calc_variant())
})

$("#copy_result_all").on("click", () => {
    let result = `${$("#result_all").val()}`
    copy_to_clipboard(result)
})

$("#copy_result_variant").on("click", () => {
    let result = `${$("#result_variant").val()}`
    copy_to_clipboard(result)
})

$("#collision_type").on("change", () => {
    validate_effects()
})

$("#collision_type, #effect_type, #shadow_type, #intensity_type, #trick_0, #trick_1, #trick_2")
    .on("change", () => {
        $("#result_all").val(calc_flag())
        $("#result_variant").val(calc_variant())
    })

const copy_to_clipboard = v => {
    try {
        if (navigator.clipboard === undefined) {
            window.clipboardData.setData('Text', v)
        } else {
            navigator.clipboard.writeText(v)
        }
    } catch (e) {
        bulmaToast.toast({
            message: `Something went wrong. ${e}}`,
            type: "is-danger",
            position: "top-center",
            animate: {in: "fadeInDown", out: "fadeOut"}
        })
    } finally {
        bulmaToast.toast({
            message: "Value copied successfully!",
            type: "is-success",
            position: "top-center",
            animate: {in: "fadeInDown", out: "fadeOut"}
        })
    }
}

const validate_effects = () => {
    let c = $("#collision_type").prop("selectedIndex")
    let $sl = $("#effect_type")
    let a = effect_variables[c]
    $sl.empty()
    if (a === undefined) {
        $.each(catch_effects, (k, v) => {
            $sl.append($("<option></option>").attr("value", k).text(v))
        })
    } else {
        $.each(a, (k, v) => {
            $sl.append($("<option></option>").attr("value", k).text(v))
        })
    }
}

const calc_flag = () => {
    let c = $("#collision_type").prop("selectedIndex")
    let e = $("#effect_type").prop("selectedIndex")
    let s = $("#shadow_type").prop("selectedIndex")
    let i = $("#intensity_type").prop("selectedIndex")

    let t0 = Number($("#trick_0").prop("checked"))
    let t1 = Number($("#trick_1").prop("checked"))
    let t2 = Number($("#trick_2").prop("checked"))

    c = parseInt(c)
    e = parseInt(e)
    s = parseInt(s)
    i = parseInt(i)
    let t = t0 | t1 << 1 | t2 << 2

    let r = (c | e << 5 | s << 8 | i << 11 | t << 13).toString(16).toUpperCase()

    switch (r.length) {
        case 1:
            r = "000" + r
            break
        case 2:
            r = "00" + r
            break
        case 3:
            r = "0" + r
            break
        default:
            break
    }

    return r
}

const calc_variant = () => {
    let e = $("#effect_type").prop("selectedIndex")
    let s = $("#shadow_type").prop("selectedIndex")
    let i = $("#intensity_type").prop("selectedIndex")

    let t0 = Number($("#trick_0").prop("checked"))
    let t1 = Number($("#trick_1").prop("checked"))
    let t2 = Number($("#trick_2").prop("checked"))

    e = parseInt(e)
    s = parseInt(s)
    i = parseInt(i)
    let t = t0 | t1 << 1 | t2 << 2

    let r = (e | s << 3 | i << 6 | t << 8).toString(16).toUpperCase()

    switch (r.length) {
        case 1:
            r = "00" + r
            break
        case 2:
            r = "0" + r
            break
        default:
            break
    }

    return r
}
