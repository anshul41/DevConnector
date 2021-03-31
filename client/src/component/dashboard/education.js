
const Education = (props) => {
    return (
      
        <div>
        <h2 className="my-2">Education Credentials</h2>
      <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th className="hide-sm">Degree</th>
              <th className="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Northern Essex</td>
              <td className="hide-sm">Associates</td>
              <td className="hide-sm">
                02-03-2007 - 01-02-2009
              </td>
              <td>
                <button className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        
    )
}


  
  export default Education;