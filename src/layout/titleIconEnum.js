
import { faBackward } from '@fortawesome/free-solid-svg-icons/faBackward';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { faList } from '@fortawesome/free-solid-svg-icons/faList';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

const iconEnum = {
    'layout-c-filterd': { src: '/images/icons/view-filter-filtered.svg' },
    'layout-c-filter': { iconName: faFilter },
    'layout-c-arrangement-1': { iconName: faList },
    'layout-c-arrangement-2': {},
    'layout-c-search': { iconName: faSearch },
    'layout-c-tip': { iconName: faInfoCircle },
    'layout-c-maximize-collapse': { src: '/images/icons/container-collapse.svg' },
    'layout-c-maximize-expand': { src: '/images/icons/container-expand.svg' },
    'layout-c-date': {},
    'layout-c-download': {},
    'layout-c-toggle-left-expand': { iconName: faBackward },
    'layout-c-toggle-left-collapse': { iconName: faBackward, rotation: 180 },
    'layout-c-toggle-right-expand': { iconName: faBackward, rotation: 180 },
    'layout-c-toggle-right-collapse': { iconName: faBackward },
    'layout-c-export-icon': { src: '/images/icons/export-icon.svg' },
    'layout-c-edit-graph': { src: '/images/icons/edit-graph.svg' },
    'layout-c-calendar': { src: '/images/icons/calendar.svg' },
}

export default iconEnum;