import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './data-table-view-options';
import { Input } from './input';

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn?: keyof TData;
}

const DataTableToolbar: <TData>(
  props: DataTableToolbarProps<TData>
) => JSX.Element = (props) => {
  const { table, filterColumn = 'title' } = props;

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter Records...'
          value={
            (table
              .getColumn(filterColumn.toString())
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table
              .getColumn(filterColumn.toString())
              ?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
};

export { DataTableToolbar };
