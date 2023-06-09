import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {
	const author = useSelector(state => selectUserById(state, userId))
	return (
		<span>by {author ? author.name : "Unknow author"}</span>
	)
}

export default PostAuthor



// import React from 'react'
// import { useSelector } from 'react-redux'

// const PostAuthor = ({ userId }) => {
// 	const author = useSelector(state => state.users.find(user => user.id === userId))
// 	return (
// 		<span>by {author ? author.name : "Unknow author"}</span>
// 	)
// }

// export default PostAuthor
