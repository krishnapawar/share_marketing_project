import React from 'react';
import styles from './Order.module.css';
const OrderComponent = ({ orderList, menu, deleteItem, exportPDF,tableNo,handleSubmit,setHiddeShow,dataInfo }) => {
  
    const updateOrderList = () => {
      if (orderList.length === 0) {
        return <tr><td style={{ textAlign: 'center' }}>Your order list is empty</td></tr>;
      }
      return (
        <>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
          {orderList.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.data.name ?? ''}</td>
              <td>{item.quantity}</td>
              <td>{item.data.price ?? ''}</td>
              <td>{item.totalPrice}</td>
              <td style={{"textAlign": "center"}}>
                <button className={styles.delBtn} onClick={() => deleteItem(index)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <th colSpan={6}>Total Price:- {orderList.reduce((acc, item) => acc + Number(item.totalPrice), 0)}</th>
          </tr>
        </>
      );
    };
  
    return (
      <section id="order-list" className={styles.orderSection}>
        
        <table id="order-tbl">
          <tr>
            <th colSpan={3}><h2>User Info</h2></th>
          </tr>
          
          <tr>
            <td>1</td>
            <td>Name</td>
            <td>{dataInfo?.name ?? "-"}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Phone No</td>
            <td>{dataInfo?.phone ?? "-"}</td>
          </tr>
          {/* <tr>
            <td>3</td>
            <td>Area Code</td>
            <td>{dataInfo?.areaCode ?? "-"}</td>
          </tr> */}
          <tr>
            <td>3</td>
            <td>Address</td>
            <td>{dataInfo?.address ?? "-"}</td>
          </tr>
        </table>

        <div className="d-flex justify-content-between align-items-center">
          <div className="text-start">
            <h2>Order Details</h2>
          </div>
          {/* <div className="text-end">
            <h2>Table No: {tableNo ?? 0}</h2>
          </div> */}
        </div>

        <table id="order-tbl">
          <tbody>{updateOrderList()}</tbody>
        </table>
        {orderList.length > 0 && (
          <div className="d-flex justify-content-between align-items-center">
            <button id="export" onClick={exportPDF} className={styles.exportBtn} style={{"background": "#ffbe76"}}>
              Export PDF <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
            </button>

            <button onClick={()=>setHiddeShow(false)} className={styles.exportBtn} style={{"background": "#ffbe76"}}>
            {/* <i className="fa fa-pen" aria-hidden="true"></i> */}
              Edit
            </button>

            <button onClick={handleSubmit} className={styles.exportBtn} style={{"background": "#ffbe76"}}>
            Submit <i className="fa fa-file-pdf-o" aria-hidden="true"></i>
            </button>

          </div>
        )}
      </section>
    );
  };
  
  export default OrderComponent;
  