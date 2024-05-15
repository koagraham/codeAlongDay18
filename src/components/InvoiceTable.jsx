import './InvoiceTable.css'
// import EditableDescriptionCell from './EditableDescriptionCell.jsx'
// import EditableHoursCell from './EditableHoursCell.jsx'
// import EditableRateCell from './EditableRateCell.jsx'
// import EditableRowModeButtons from './EditableRowModeButtons.jsx'
import InvoiceTableHeader from './InvoiceTableHeader.jsx'
import InvoiceTableAddButton from './InvoiceTableAddButton.jsx'
import InvoiceTableRow from './InvoiceTableRow.jsx'
import { useState } from 'react'
import generateId from '../utils/idGenerator.js'

function InvoiceTable({ initialInvoiceList }) {
    const [invoiceList, setInvoiceList] = useState(initialInvoiceList)
    const addInvoiceRow = () => {
        const newInvoiceList = [...invoiceList]
        newInvoiceList.push({
          id: generateId(),
          description: 'Description',
          rate: '',
          hours: '',
          isEditing: true,
        });
        setInvoiceList(newInvoiceList);
    }
    
    const deleteInvoiceRow = (id) => {
        const newInvoiceList = [...invoiceList];
        const index = newInvoiceList.findIndex((invoice) => invoice.id === id);
        newInvoiceList.splice(index, 1);
        setInvoiceList(newInvoiceList);
    }
    const rows = invoiceList.map((invoiceItem) => {
        const { id, description, rate, hours } = invoiceItem;
    
        return (
          <InvoiceTableRow
            key={id}
            initialInvoiceData={{ description, rate, hours }}
            initialIsEditing={false}
            onDeleteRow={() => deleteInvoiceRow(id)}
          />
        );
    }
    )
    return <table>
        <thead>
            <InvoiceTableHeader />
        </thead>
        <tbody>
            {rows}
        </tbody>
        <tfoot>
            <InvoiceTableAddButton onClick={addInvoiceRow}/>
        </tfoot>
    </table>
}

export default InvoiceTable