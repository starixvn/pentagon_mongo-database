/*  =============================================================================
 *  script/shellExtension.js v1.0.0
 *  =============================================================================
 */
{
    // shellAutocomplete
    const shellAutocompleteProc = function (prefix) {
        const fileList = ls().map(_ => `${/^\.\/(.*)$/.exec(_)[1]} *`);
        __autocomplete__ = __autocomplete__.concat(fileList.filter(_ => RegExp(`^${prefix}`).test(_).sort()));
    };

    db.getSiblingDB(`script`).system.js.save({
        _id: `shellAutocomplete`
    ,   value:  new Code(`(() => {
            const global = Function('return this')();
            global.defaultShellAutocomplete = global.defaultShellAutocomplete ? global.defaultShellAutocomplete : global.shellAutocomplete;
            const _shellAutocomplete = ${shellAutocompleteProc.toString()};

            return function (prefix) {
                global.defaultShellAutocomplete(prefix);
                _shellAutocomplete(prefix);
            }
        })()`)
        ,   version: `1.0.0`
        ,   changelog: {
                '1.0.0': [
                    `Release [shellAutocomplete]`
                ]
            }
    });

    // Reload scripts
    db.getSiblingDB(`script`).loadServerScripts();
}
