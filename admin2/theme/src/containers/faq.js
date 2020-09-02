import React from 'react'
import { themeSettings, text } from '../lib/settings'
import MetaTags from '../components/metaTags'
import HeadBox from '../components/headBox'
import * as helper from '../lib/helper'
import Subscribe from '../components/subscribe'

const data = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
  }
]

class FaqContainer extends React.Component {

  state = {
    selectedIndexs:[]
  }

  render() {
    let {pageDetails, settings} = this.props.state

    return (
      <div>
        <MetaTags
          title={pageDetails.meta_title}
          description={pageDetails.meta_description}
          canonicalUrl={pageDetails.url}
          ogTitle={pageDetails.meta_title}
          ogDescription={pageDetails.meta_description}
        />
        <HeadBox title="FAQ" backgroundColor="#9CDDA8"/>
        <div className="faq-wrap">
          {data.map((item,index)=>this.renderItem(item,index))}
        </div>
        <Subscribe />
      </div>
    )
  }

  renderItem = (item,index) => {
    let showing = this.state.selectedIndexs.indexOf(index) > -1
    return (
      <section className="container">
        <div className="faq-item" onClick={()=>this.onClickItem(index)}>
          <img src={showing ? "/assets/images/cestore/ic_collapse.svg" : "/assets/images/cestore/ic_expand.svg"} alt="img"/>
          <div className="faq-item-content">
              <p>{item.question}</p>
              {showing && <p className="faq-item-answer">{item.answer}</p>}
          </div>
        </div>
      </section>
    )
  }

  onClickItem = (index)=>{
    var indexs = this.state.selectedIndexs
    let i = indexs.indexOf(index)
    if (i > -1) {
      indexs.splice(i, 1);
    }else{
      indexs.push(index)
    }
    this.setState({selectedIndexs: indexs})
  }

}

export default FaqContainer
