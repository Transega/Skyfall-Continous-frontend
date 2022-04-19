import React from 'react'



const cropSelection = (props) => {
    const onChoice = e => {
        props.onSelect(e.target.value)
    }
  return (
    <div>
        <select onChange={onChoice}>
                <option value={null}>------------------</option>
                {/* {props.posts.map(post => (<option key={post.id} value={post.id}>{post.title}</option>))} */}
            </select>
      
    </div>
  )
}

export default cropSelection
