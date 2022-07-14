// department id = 10 => egiptian art

const container = document.getElementById('container')

const concatDepartmentFetchUrl = (info) => `https://collectionapi.metmuseum.org/public/collection/v1/objects?${info}`
const concatObjectFetchtUrl = (info) => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${info}`

const fetchIdsByDepartment = async (departmentIdUrl) => {
  try {
    const response = await fetch(departmentIdUrl);
    const arrayOfObjectsIds = await response.json();
    return arrayOfObjectsIds
  } catch (error) {
    return error;
  }
}

const filterDepartmentIds = ({ objectIDs }, amount) => {
  try {
    // const { objectIDs } = await fetchIdsByDepartment('departmentIds=10');
    const arrayOfFilteredIDs = objectIDs.slice(0, amount);
    return arrayOfFilteredIDs
  } catch (error) {
    return error;
  }
}

const fetchObjectsById = (idsArray) => { // o log imprime o objeto mas a ASWR retorna um array de promisses / o loga da funcao filterobjinfo imprime antes do desta(estranho)
  try {
    const aswr = idsArray.map(async id => {
      const idUrl = concatObjectFetchtUrl(id);
      const response = await fetch(idUrl);
      const data = await response.json();
      console.log(data)
      return data
    })
    return aswr
  } catch (error) {
    return error
  }
}

// const getIdsAndObjects = () => {
//   try {
//     const idsArray = await filterDepartmentIds(10);
//     const ObjectsArray = await fetchObjectsById(idsArray);
//     return ObjectsArray
//   } catch (error) {
//     return error;
//   }
// }

const filterObjectInfo = (arrayOfObjects) => {
  try {
    // const arrayOfObjects = await getIdsAndObjects();
    console.log('arrayOfObjects', arrayOfObjects, arrayOfObjects.at(1))
    const aswr = arrayOfObjects.map(({ title, primaryImage }) => ({ title, primaryImage }));
    return aswr
  } catch (error) {
    return error;
  }
}

const printData = (objects) => {
  try {
    // const objects = await filterObjectInfo();
    objects.forEach(({ title, primaryImage }) => {
      const newDiv = document.createElement('div');
      const newImg = document.createElement('img');
      const newH2 = document.createElement('p');
      newH2.innerText = title;
      newImg.src = primaryImage;
      newDiv.className = 'card';
      newDiv.appendChild(newImg)
      newDiv.appendChild(newH2);
      container.appendChild(newDiv)
    })
  } catch (error) {
    return error;
  }
}

window.onload = async () => {
  try {
    const DepartmentFetchUrl = concatDepartmentFetchUrl('departmentIds=10');
    const idsArray = await fetchIdsByDepartment(DepartmentFetchUrl);
    const filteredIdsArray = filterDepartmentIds(idsArray, 10);
    const fetchedObjectsArray = fetchObjectsById(filteredIdsArray);
    const filteredObjectsArray = filterObjectInfo(fetchedObjectsArray)
    printData(filteredObjectsArray)
  } catch (error) {
    console.error(error)
  }
}
