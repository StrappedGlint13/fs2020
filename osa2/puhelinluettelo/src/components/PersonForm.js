
import React from 'react'

const PersonForm = (props) =>
<form onSubmit={props.addnew}>
<div>
  name: <input value={props.newname}
  onChange={props.handle1} />
</div>
<div>
  number: <input value={props.newnumber}
  onChange={props.handle2} />
</div>
<div>
  <button type="submit">add</button>
</div>
</form>

export default PersonForm
