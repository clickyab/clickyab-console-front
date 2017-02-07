import {Table, Column, Cell} from "fixed-data-table";
import React from "react";
import HeaderCell from "./HeaderCell";
import {TextCell} from "./TextCell";
import {select} from "../../../functions/select";
import {dispatch} from "../../../functions/dispatch";
import {channelQueryAction, updateLocalStorageAction} from "../../../redux/actions/index";

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
        let widthDatatableHolder = $(".datatable-parent").length > 0 ?
            $(".datatable-parent").outerWidth() : $("body").outerWidth();
        let margin = $(".datatable-parent").length > 0 ? 58 : 320;
        this.setState({
            width: widthDatatableHolder - margin
        });
    }

    setRows(items, definitions) {
        let {sort, filter, search, list, change, edit, mutators} = this.props;
        if (!mutators) {
            mutators = {};
        }
        let _items = [];
        let columnDefinition;
        for (let i = 0; i < definitions.length; i++) {
            columnDefinition = definitions[i];
            if (columnDefinition.visible)
                _items.push(<Column
                    header={
                        <HeaderCell
                            list={list}
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
                        mutator={mutators[columnDefinition.data]}
                        actions={columnDefinition.data == "_actions"}
                        change={change} edit={edit}
                        column={columnDefinition.data} items={items}
                        width={columnDefinition.width}
                        className="value-datatable"
                    />}
                    flexGrow={i}
                    maxWidth={10} width={columnDefinition.width} key={Math.random()}/>);
        }

        return _items;
    }

    setWidthBaseOnRowName(definitions) {
        for (let def of definitions) {
            def.width = def.data.toString().length * 10 + 10;
            if (def.filter_valid_map || def.searchable) {
                if (def.width < 180) {
                    def.width = 180;
                }
            }
        }
    }

    setWidthBaseOnValues(items, definitions) {
        let length;
        let key;

        for (let i = 0; i < items.length; i++) {
            for (let def of definitions) {
                key = def.data;

                if (items[i][key]) {
                    length = items[i][key].toString().length;
                } else {
                    length = 0;
                }


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

    setWidth(items, definitions) {
        this.setWidthBaseOnRowName(definitions);
        this.setWidthBaseOnValues(items, definitions);
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

    onPaginationChange(page) {
        let {onPaginationChange, list} = this.props;

        dispatch(channelQueryAction(list, 'p', page));
        dispatch(updateLocalStorageAction());

        onPaginationChange(page);
    }

    onPerPageChange(per_page) {
        let {onPerPageChange, list} = this.props;

        dispatch(channelQueryAction(list, 'c', per_page));
        dispatch(updateLocalStorageAction());

        onPerPageChange(per_page);
    }


    pagination() {
        const per_page = select('queries.' + this.props.list + '.c', 10);
        let pages_count = Math.floor(this.props.total / per_page);
        if (pages_count == 0) {
            pages_count = 1;
        }

        let pages = [];
        for (let i = 0; i < pages_count; i++) {
            pages.push(<option key={i}>{i + 1}</option>);
        }

        return pages;
    }

    render() {
        let {items, definitions, list} = this.props;

        this.setWidth(items, definitions);
        definitions = this.addActionHeader(definitions);
        definitions = definitions.reverse();

        return (
            <div>
                <Table rowHeight={50} rowsCount={items.length}
                       headerHeight={100}  {...this.state} height={items.length * 50 + 120} {...this.props}>
                    {this.setRows(items, definitions)}
                </Table>
                <div style={{display: 'inline-block'}}>
                    <select style={{display: 'inline-block', width: 'auto', padding: '0'}} className="form-control"
                            defaultValue={select('queries.' + list + '.p', 1)} onChange={(event) => {
                        this.onPaginationChange(parseInt(event.target.value));
                    }}>
                        {this.pagination()}
                    </select>
                    <input style={{display: 'inline-block', width: 'auto', textAlign: 'left'}} className="form-control"
                           type="text" onChange={(event) => {
                        this.onPerPageChange(parseInt(event.target.value))
                    }} defaultValue={select('queries.' + list + '.c', 10)}/>
                </div>
            </div>
        );
    }
}

DataTable.propTypes = {
    items: React.PropTypes.array
};
