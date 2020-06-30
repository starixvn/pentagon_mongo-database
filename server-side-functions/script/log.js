db.getSiblingDB('script').system.js.save({
    _id: 'log'
,   value:  (str, title, label, type) => {
        try {
            if (typeof str == "object")
                str = tojson(str);
            if (typeof title != "string")
                title = ' ';
            if (typeof label != "string")
                label = 'VERBOSE';
            if (typeof type != "string")
                type = label ? label : 'V';

            var d = new Date();
            print(d.toISOString() + '     ' + type.ltrim().substr(0,1).toUpperCase() + '  ' + label.toUpperCase() + ' [' + title + '] ' + str);
        } catch (e) {}
    }
}); db.getSiblingDB('script').loadServerScripts();
