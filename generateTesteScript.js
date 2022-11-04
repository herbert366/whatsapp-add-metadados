const _ = require('lodash')
const db = require('./db.json')

function generateLeadAnuncioName() {
  const possiblesAddsId = [1, 2, 3]
  const possiblesStartsId = [1, 2, 3]

  const decideInicio = {
    anuncioIdActual: _.sample(possiblesAddsId),
    inicioIdActual: _.sample(possiblesStartsId),
  }

  let anuncioName = ''
  if (decideInicio.anuncioIdActual === 1) {
    anuncioName = 'meninaTriste'
  }
  if (decideInicio.anuncioIdActual === 2) {
    anuncioName = 'meninoSorrindo'
  }
  if (decideInicio.anuncioIdActual === 3) {
    anuncioName = 'SóOlhinho'
  }

  return { anuncioName, decideInicio }
}
const indexesLeadsInDb = Object.keys(db).reduce((acc, lead) => {
  let onlyIndexes = Number(lead.match(/\d/g))
  acc.push(onlyIndexes)

  return acc
}, [])

function changeNameLead(dbOfleads) {
  const AnuncioNameCreated = generateLeadAnuncioName().anuncioName
  let numberLead = 0

  indexesLeadsInDb.forEach(value =>
    numberLead === value ? numberLead++ : numberLead
  )

  const dateInter = new Date()
  const date = dateInter.toLocaleDateString('pt-BR').slice(0, 5)
  const nameChanged = `Lead#${numberLead} ${AnuncioNameCreated} ${date}`

  return { nameChanged, date, numberLead }
}

console.log(changeNameLead(db))
console.log(addNewLeadInDb(changeNameLead))

function addNewLeadInDb(functionWithObjects) {
  return {
    ...db,
    [`lead-${functionWithObjects().numberLead}`]: {
      id: functionWithObjects().numberLead,
      nameCreated: functionWithObjects().nameChanged,
      actualTags: { anuncioIdActual: 0, inicioIdActual: 0 },
    },
  }
}
