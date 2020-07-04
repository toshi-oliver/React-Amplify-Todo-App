// action = {
//  id: 1
//  type: "CREATE_EVENT"
//  body: "2020年に東京でオリンピックが開催されます"
//}
//#before
//state = []
//#after
//state = [{
// id: 1
//  type: "CREATE_EVENT"
//  body: "2020年に東京でオリンピックが開催されます"
//}]
//
const events = (state = [], action) => {
  switch(action.type) {
    case "CREATE_EVENT":
      const event = { body: action.body}
      const length = state.length
      const id = length === 0 ? 1 : state[length -1].id + 1
      return [...state, {id: id, ...event }] //スプレッド演算子の一番後ろに要素を追加
    case "DELETE_EVENT":
      return state
    case "COMPLETE_EVENT":
      return state

    default:
      return state
  }
}

export default events