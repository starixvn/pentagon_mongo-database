db.getSiblingDB('script').system.js.save({
    _id: 'log'
,   value:  (str, title, label, type) => {
        let e;

        try {
            if (typeof str == "object")
                str = tojson(str);
            if (typeof title != "string")
                title = ' ';
            if (typeof label != "string")
                label = 'VERBOSE';
            if (typeof type != "string")
                type = label ? label : 'V';

            let d = new Date();
            print(d.toISOString().pad(29, 1) + type.ltrim().substr(0,1).toUpperCase().pad(3, 1) + label.toUpperCase().pad(8, 1) + ' [' + title + '] ' + str);
        } catch (e) {}
    }
,   version: 1.4
,   process: 'Global Functions'
}); db.getSiblingDB('script').loadServerScripts();
