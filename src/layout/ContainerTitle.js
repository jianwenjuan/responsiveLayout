import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import iconEnum from './titleIconEnum';



class ContainerTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
        this.getDefaultSelectedMenu();

    }

    generateIconBtn() {
        const iconArray = this.props.icons;

        if (!iconArray) return;
        const btns = [];
        if (iconArray.length) {
            iconArray.forEach((element, index) => {
                let icon = '';
                if (iconEnum[element.icon]) {
                    if (iconEnum[element.icon].iconName) {
                        icon = <FontAwesomeIcon color="#9aabaf" icon={iconEnum[element.icon].iconName} onClick={this.onClick(element.type, element.onClick)} rotation={iconEnum[element.icon].rotation} size="xs" />;
                    } else {
                        icon = <img src={iconEnum[element.icon].src} onClick={this.onClick(element.type, element.onClick)} />;
                    }
                }

                switch (element.type) {
                    case 'search':
                        this.props.config.expand && btns.push(<div key={index} className="search-area" >
                            <input type="text" placeholder={'search'} onChange={this.onChange(element.onChange)} maxLength="255" />
                            <span className="search-icon">{icon}</span>
                        </div>);
                        break;
                    case 'toggle':
                        element.dir === 'left' ? btns.push(<span key={index} className="hx-left-icon">{icon}</span>) :
                            btns.push(<span key={index} className="hx-right-icon">{icon}</span>);
                        break;
                    default:
                        this.props.config.expand && btns.push(<span key={index} className="hx-right-icon">{icon}</span>);
                }
            });
        }
        return btns;
    }

    onClick(type, callback) {
        return () => {
            const handler = this.props[`on${type}`];
            if (handler)
                handler(this.props.config);
            callback && callback(this.props.config);
        }
    }

    onChange(callback) {
        return (e) => {
            callback && callback(e);
        }
    }

    getDefaultSelectedMenu() {
        if (this.props.dropDownMenu && this.props.dropDownMenu.length) {
            const dropDownMenu = this.props.dropDownMenu;
            const isHasDefaultSelectedMenu = dropDownMenu.some((item) => {
                if (item.selected) {
                    this.state.selectedMenu = item.name;

                }
                return item.selected;
            });

            if (!isHasDefaultSelectedMenu) {
                dropDownMenu[0].selected = true;
                this.state.selectedMenu = dropDownMenu[0].name
            }
        }
    }


    getDropDownMenu() {
        const dropDownMenu = this.props.dropDownMenu;
        if (!dropDownMenu || !dropDownMenu.length) return '';
        const items = dropDownMenu.map((item, i) => {
            return <DropdownItem className={item.selected ? 'selected' : ""} key={i} onClick={this.onClickMenuItem(item, dropDownMenu)} >{item.name}</DropdownItem>
        });

        return (
            <Dropdown isOpen={this.state.dropdownOpen} className={this.state.dropdownOpen ? 'dropdown-open' : ''} toggle={this.toggleDropdown.bind(this)}>
                <DropdownToggle
                    tag="span"
                    caret>
                    {this.state.selectedMenu}
                </DropdownToggle>
                <DropdownMenu>
                    {items}
                </DropdownMenu>
            </Dropdown>
        );
    }

    onClickMenuItem(item, items) {

        return () => {
            items.forEach((element) => {
                if (element.selected) {
                    element.selected = false;
                }
            })
            item.selected = true;
            this.setState({
                selectedMenu: item.name
            });

            item.onClick && item.onClick();

        }
    }

    toggleDropdown() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }



    render() {
        const btns = this.generateIconBtn();
        const dropDownMenu = this.getDropDownMenu();

        return (
            <div className="lc-container-title">
                {btns && btns.map((item) => {
                    return item;
                })}
                {!!this.props.config.expand && dropDownMenu}
                {!!this.props.config.expand && !dropDownMenu &&
                    (<span className="title-area" >
                        {this.props.title}
                    </span>)}
            </div>
        )
    }
}

export default ContainerTitle;