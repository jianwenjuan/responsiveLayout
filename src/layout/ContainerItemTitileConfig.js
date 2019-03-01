const itemTileConfig = (config) => {
    const titleConfig = config.titleConfig;

    if (titleConfig) {
        const icons = titleConfig.icons;

        if (icons && icons.length) {
            icons.forEach(element => {
                if (element.type === 'maximize') {
                    config.isMaximize ?
                        element.icon = 'layout-c-maximize-collapse' :
                        element.icon = 'layout-c-maximize-expand';
                }

                if (element.type === 'toggle') {
                    config.expand ?
                        element.icon = `layout-c-toggle-${element.dir}-expand` :
                        element.icon = `layout-c-toggle-${element.dir}-collapse`;
                }

            });
        }
    }

    return titleConfig;

}

export default itemTileConfig;