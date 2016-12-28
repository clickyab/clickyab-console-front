import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from './HeaderCell';
import {TextCell} from './TextCell';

export default class DataTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: props.items.length * 50 + 120,
            width: 200
        }
    }

    componentDidMount() {
        this._update();
        let win = window;

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
        let heightDatatableHolder = $(".datatable-parent").outerWidth();
        this.setState({
            renderPage: true,
            width: heightDatatableHolder - 58
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
                            width={columnDefinition.width}
                            searchable={columnDefinition.searchable}>
                            {columnDefinition.name}
                        </HeaderCell>
                    }
                    cell={<TextCell
                        mutator={this.props.mutators[columnDefinition.data]}
                        actions={columnDefinition.data == "_actions"}
                        change={change} edit={edit}
                        column={columnDefinition.data} items={items}
                        width={columnDefinition.width}
                    />}
                    maxWidth={10} width={columnDefinition.width} key={Math.random()}/>);
        }

        return _items;
    }

    setWidth(items, definitions) {
        let length;
        let key;
        for (let def of definitions) {
            def.width = def.data.toString().length * 10 + 10;
            if (def.filter_valid_map || def.searchable) {
                if (def.width < 180) {
                    def.width = 180;
                }
            }
        }
        for (let i = 0; i < items.length; i++) {
            for (let def of definitions) {
                key = def.data;
                length = items[i][key].toString().length;
                if (length > def.width) {
                    def.width = length * 10 + 10;
                    if (def.filter_valid_map || def.searchable) {
                        if (def.width < 180) {
                            def.width = 180;
                        }
                    }
                }
            }
        }
    }

    addActionHeader(definitions) {
        return [...definitions, {
            width: 150,
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

        this.setWidth(items, definitions);
        definitions = this.addActionHeader(definitions);
        items = items.reverse();
        definitions = definitions.reverse();
        return (
            <Table rowHeight={50} rowsCount={items.length}
                   headerHeight={80}  {...this.state} {...this.props}>
                {this.setRows(items, definitions)}
            </Table>
        );
    }
}

DataTable.propTypes = {
    items: React.PropTypes.array
};