db.getSiblingDB('script').system.js.save({
    _id: 'log'
,   value:  (str, title, label, type) => {
        if (typeof type != "string")
            type = 'V';
        if (typeof label != "string")
            label = 'VERBOSE';
        if (typeof title != "string")
            title = ' ';
        if (typeof str == "object")
            str = tojson(str);

        d = new Date();
        print(d.toISOString() + ' ' + type.ltrim().substr(0,1).toUpperCase() + '  ' + label.toUpperCase() + ' [' + title + '] ' + str);
    }
}); db.getSiblingDB('script').loadServerScripts();
