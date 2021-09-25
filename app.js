const searchInput = document.querySelector('.search-api-input')
const googleBlock = document.querySelector('.google-search')
const dataPanel = document.querySelector('.dataPanel')
const idSearchBtn = document.querySelector('.id-search-btn')
const idSearchInput = document.querySelector('.id-search-input')
let googleSearchInput = null
let googleSearchBtn = null
let urlPosition = null
let finalText = ''
let userData = []
let blogData = []


function searchBlog() {
  setTimeout(() => {
    urlPosition = document.querySelectorAll('.gs-visibleUrl-breadcrumb') // 找出帳號的網址欄className，
    for (let i = 0; i < urlPosition.length; i++) { // 使用for迴圈遍歷這些位置
      const copyBtn = document.createElement('button') // 創建一個按鈕元素
      copyBtn.innerText = 'Search' // 寫上copy
      copyBtn.classList.add('search-btn') // 加上樣式
      copyBtn.setAttribute('data-id', `${i}`) // 設定data-id，方便之後取用
      urlPosition[i].append(copyBtn) // 插入元素到最後方
      urlPosition[i].addEventListener('click', event => { // 在父層掛上監聽器
        const copyContent = urlPosition[event.target.dataset.id].lastChild.previousElementSibling.innerText // 選出要複製的文字
        const index = copyContent.indexOf('›') // 處理文字前面的特殊符號
        const rangeText = copyContent.slice(index + 1) // 取得修改後的字
        finalText = rangeText.trim() // 將前方後方空白移除後置入 Api的search bar
        //接著把文字帶入痞客邦的API搜尋
        axios.get(`https://emma.pixnet.cc/users/${finalText}`).then(res => {
          userData = res.data.user // 將API取得資料丟進變數
          innerData() // 將物件資料置入HTML中
        }).catch(error => console.log(error))
        axios.get(`https://emma.pixnet.cc/blog?user=${finalText}`).then(res => {
          blogData = res.data.blog // 將API取得資料丟進變數
          innerData() // 將物件資料置入HTML中
        }).catch(error => console.log(error))
      })
    }
  }, 1000);
}

function innerData() {
  const account = document.querySelector('.account-value')
  const blogger = document.querySelector('.blogger-value')
  const blog = document.querySelector('.blog-value')
  const link = document.querySelector('.link-value')
  const description = document.querySelector('.description-value')
  const keyword = document.querySelector('.keyword-value')

  account.value = userData.name
  blogger.value = userData.display_name
  blog.value = blogData.name
  link.value = blogData.link
  description.value = blogData.description
  keyword.value = blogData.keyword
}


window.addEventListener("load", function (event) {
  // All resources finished loading![
  googleSearchInput = document.querySelector('#gsc-i-id1')
  googleSearchBtn = document.querySelectorAll('td button')[0]
  googleSearchInput.addEventListener('keydown', event => {
    if (!googleSearchInput.value.trim()) return
    if (event.key === 'Enter') {
      searchBlog()
    }
    return
  })
  googleSearchBtn.addEventListener('click', event => {
    searchBlog()
  })
});

idSearchBtn.addEventListener('click', event => {
  axios.get(`https://emma.pixnet.cc/users/${idSearchInput.value}`).then(res => {
    userData = res.data.user // 將API取得資料丟進變數
    innerData() // 將物件資料置入HTML中
  }).catch(error => console.log(error))
  axios.get(`https://emma.pixnet.cc/blog?user=${idSearchInput.value}`).then(res => {
    blogData = res.data.blog // 將API取得資料丟進變數
    innerData() // 將物件資料置入HTML中
  }).catch(error => console.log(error))
})

idSearchInput.addEventListener('keydown', event => {
  if (!idSearchInput.value.trim()) return
  if (event.key === 'Enter') {
    axios.get(`https://emma.pixnet.cc/users/${idSearchInput.value}`).then(res => {
      userData = res.data.user // 將API取得資料丟進變數
      innerData() // 將物件資料置入HTML中
    }).catch(error => console.log(error))
    axios.get(`https://emma.pixnet.cc/blog?user=${idSearchInput.value}`).then(res => {
      blogData = res.data.blog // 將API取得資料丟進變數
      innerData() // 將物件資料置入HTML中
    }).catch(error => console.log(error))
  }
  return
})


dataPanel.addEventListener('click', (e) => {
  if (e.target.matches('.data-copy')) {
    const copyText = document.querySelectorAll('.copy-text')
    console.log(copyText[Number(e.target.dataset.id)])
    copyText[Number(e.target.dataset.id)].select()
    navigator.clipboard.writeText(copyText[Number(e.target.dataset.id)].value);
  }
})

