import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from './HeaderCell';
import {TextCell} from './TextCell';

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 500,
            width: 200
        }
    }

    componentDidMount() {
        this._update();
        let win = window;
        console.log(win);
        if (win.addEventListener) {
            win.addEventListener('resize', this._onResize.bind(this), false);
        } else if (win.attachEvent) {
            win.attachEvent('onresize', this._onResize.bind(this));
        } else {
            win.onresize = this._onResize;
        }
    }

    _onResize() {
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(this._update.bind(this), 16);
    }

    _update() {
        let win = window;

        let widthOffset = win.innerWidth < 680 ? 0 : 240;

        this.setState({
            renderPage: true,
            width: win.innerWidth - widthOffset,
            height: win.innerHeight - 200,
        });
    }

    setRows(items, definitions) {
        const {sort, filter, search, change, edit} = this.props;

        let _items = [];
        let columnDefinition;
        for (let i = 0; i < definitions.length; i++) {
            columnDefinition = definitions[i];
            if (columnDefinition.visible)
                _items.push(<Column
                    header={
                        <HeaderCell
                            sort={sort}
                            filter={filter}
                            search={search}
                            query_name={columnDefinition.data}
                            filters={columnDefinition.filter_valid_map}
                            sortable={columnDefinition.sortable}
                            searchable={columnDefinition.searchable}>
                            {columnDefinition.name}
                        </HeaderCell>
                    }
                    cell={<TextCell
                        actions={columnDefinition.data == "_actions"}
                        change={change} edit={edit}
                        column={columnDefinition.data} items={items}
                    />}
                    fixed={true} width={160} key={Math.random()}/>);
        }

        return _items;
    }

    addActionHeader(definitions) {
        return [...definitions, {
            data: '_actions',
            filter: false,
            filter_valid_map: null,
            searchable: false,
            sortable: false,
            title: "Action",
            name: "Action",
            visible: true
        }
        ];
    }

    render() {
        let {items, definitions} = this.props;
        definitions = this.addActionHeader(definitions);

        return (
            <Table rowHeight={50} rowsCount={items.length}
                   headerHeight={50} {...this.state} {...this.props}>
                {this.setRows(items, definitions)}
            </Table>
        );
    }
}

DataTable.propTypes = {
    items: React.PropTypes.array
};