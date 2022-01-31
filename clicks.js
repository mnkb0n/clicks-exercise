const fs = require('fs')

const Clicks = {

  manipulateDataset : dataset => {    
    
    //Get most expensive clicks
    dataset = Clicks.getMostExpensiveByHourPeriod(dataset)

    //Remove ips with more than 10 records
    return Clicks.removeMoreThan10Records(dataset)
  },

  //Remove from dataset if there is more than 10 clicks within the same IP  
  removeMoreThan10Records : dataset => {    
    let newDataset = []    
    const uniqueIPs = Clicks.getUniquesByKey(dataset, 'ip')
    
    uniqueIPs.forEach(uniqueIP => {
      let items = dataset.filter(({ ip }) => ip === uniqueIP )      
      if (items.length <= 10) newDataset = [...newDataset, ...items]
    })
    return newDataset
  },
  
  getMostExpensiveByHourPeriod : dataset => {    
    let newDataset = []      

    dataset.forEach(item => {
      if(Clicks.exists(newDataset, item)) return false

      //Get all the records for item time period and ip
      let itemsPeriod = dataset.filter(itemAux => {
        let itemAuxHourPeriod = new Date(itemAux.timestamp).getHours()
        let itemHourPeriod = new Date(item.timestamp).getHours()
        if(itemHourPeriod === itemAuxHourPeriod && item.ip === itemAux.ip) return true
      })

      if(itemsPeriod.length === 1){
        newDataset.push(itemsPeriod[0])
        return false
      }

      //Get the most expensives 
      let maxAmount = 0
      let result = []
      itemsPeriod.forEach(item => {
        if(item.amount > maxAmount){
          result = []
          maxAmount = item.amount
          result.push(item)
        }else if(item.amount === maxAmount){
          result.push(item)
        }
      })

      if(result.length === 1){
        if(!Clicks.exists(newDataset, result[0])) newDataset.push(result[0])

      }else{
        //Find the earliest 
        let sooner = itemsPeriod.reduce((prev, curr) => {
          let prevTS = new Date(prev.timestamp).getTime()
          let currentTS = new Date(curr.timestamp).getTime()
          return prevTS < currentTS ? prev : curr;
        })
        if(!Clicks.exists(newDataset, sooner)){          
          newDataset.push(sooner)
          return false
        }
      }
    })

    return newDataset
  },

  //check if item exists in dataset
  exists : (dataset, item)  => { return dataset.filter(e => e.timestamp === item.timestamp && e.ip === item.ip).length > 0 ? true : false },  

  //Get and return unique values from array of objects by field
  getUniquesByKey : (dataset, key) => { return [... new Set(dataset.map(( item ) => item[key]))] },

  //Save dataset result set as a json file
  saveToFile : dataset => {       
    fs.writeFile("resultset.json", JSON.stringify(dataset), error => {
      if(error) return console.log("ERROR! :", error);
      console.log("resultset.json saved successfully");      
    })
  }
}

module.exports = Clicks