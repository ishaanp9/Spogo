import React from 'react';

let userInfoDict = {};

let videoItemArray = [];
let experienceItemArray = [];
let experienceItemCurrentId = 0;
let trophyItemArray = [];
let trophyItemCurrentId = 0;
let measurableItemArray = [];
let measurableItemCurrentId = 0;
let videoImageCurrentId = 0;

let userDataCollected = false;

export const getUserDataCollected = () => {
    return userDataCollected
}

export const setUserDataCollected = () => {
    userDataCollected = true;
}

function ExpTrophyCardObject(title, duration, description, idNum) {
    this.title = title;
    this.duration = duration;
    this.description = description;
    this.idNum = idNum;
}

function MeasurableCardObject(title, value, idNum) {
    this.title = title;
    this.value = value;
    this.idNum = idNum;
}

export const clearAllData = () => {
    experienceItemCurrentId = 0
    trophyItemCurrentId = 0;
    measurableItemCurrentId = 0;
    videoImageCurrentId = 0;
    userInfoDict = {}
    experienceItemArray = []
    trophyItemArray = []
    measurableItemArray = []
    videoItemArray = []
}

export const addUserInfo = (key, value) => {
    userInfoDict[key] = value;
    //console.warn(key + ': ' + value)
}

export const getUserInfo = (key) => {
    let value = null;
    if (userInfoDict[key] != null) {
        value = (userInfoDict[key])
    }
    return (value);
}

export const getUserDict = () => {
    return userInfoDict;
}

export const setUserDict = (infoDict) => {
    userInfoDict = infoDict
    userInfoDict = userInfoDict['userArray']
}



//Experience
export const addExperienceItem = (title, duration, description, idNum) => {
    const CardObjectExample = new ExpTrophyCardObject(title, duration, description, idNum);
    experienceItemArray.push(CardObjectExample)
}

export const getExperienceArray = () => {
    return (experienceItemArray);
}

export const deleteExperienceItem = (index) => {
    experienceItemArray.splice(index, 1);
    for (let i = index; i < experienceItemArray.length; i++){
        experienceItemArray[i].idNum = experienceItemArray[i].idNum  - 1;        
    }
    experienceItemCurrentId --;
}

export const editExperienceItem = (title, duration, description, index) => {
    experienceItemArray[index].title = title;
    experienceItemArray[index].duration = duration;
    experienceItemArray[index].description = description;
}
 
export const addExperienceID = () => {
    experienceItemCurrentId ++;
}

export const getExperienceID = () => {
    return experienceItemCurrentId;
}

export const setExperienceArray = (expArray) => {
    experienceItemArray = expArray;
    experienceItemArray = experienceItemArray['experienceArray']
}

export const setExperienceID = () => {
    for (let i = 0; i < experienceItemArray.length; i++) {
        experienceItemCurrentId ++;
    }
}
//Experience

//Trophy
export const addTrophyItem = (title, duration, description, idNum) => {
    const CardObjectExample = new ExpTrophyCardObject(title, duration, description, idNum);
    trophyItemArray.push(CardObjectExample)
}

export const getTrophyArray = () => {
    return (trophyItemArray);
}

export const deleteTrophyItem = (index) => {
    trophyItemArray.splice(index, 1);
    for (let i = index; i < trophyItemArray.length; i++){
        trophyItemArray[i].idNum = trophyItemArray[i].idNum  - 1;        
    }
    trophyItemCurrentId --;
}

export const editTrophyItem = (title, duration, description, index) => {
    trophyItemArray[index].title = title;
    trophyItemArray[index].duration = duration;
    trophyItemArray[index].description = description;
}

export const addTrophyID = () => {
    trophyItemCurrentId ++;
}

export const getTrophyID = () => {
    return trophyItemCurrentId;
}

export const setTrophyArray = (trophyArray) => {
    trophyItemArray = trophyArray;
    trophyItemArray = trophyItemArray['trophyArray']
}

export const setTrophyID = () => {
    for (let i = 0; i < trophyItemArray.length; i++) {
        trophyItemCurrentId ++;
    }
}
//Trophy

//Measurable
export const addMeasurableItem = (title, value, idNum) => {
    const CardObjectExample = new MeasurableCardObject(title, value, idNum);
    measurableItemArray.push(CardObjectExample)
}

export const getMeasurableArray = () => {
    return (measurableItemArray);
}

export const deleteMeasurableItem = (index) => {
    measurableItemArray.splice(index, 1);
    for (let i = index; i < measurableItemArray.length; i++){
        measurableItemArray[i].idNum = measurableItemArray[i].idNum  - 1;        
    }
    measurableItemCurrentId --;
}

export const editMeasurableItem = (title, value, index) => {
    measurableItemArray[index].title = title;
    measurableItemArray[index].value = value;
}

export const addMeasurableID = () => {
    measurableItemCurrentId ++;
}

export const getMeasurableID = () => {
    return measurableItemCurrentId;
}

export const setMeasurableArray = (measurableArray) => {
    measurableItemArray = measurableArray;
    measurableItemArray = measurableItemArray['measurableArray']
}

export const setMeasurableID = () => {
    for (let i = 0; i < measurableItemArray.length; i++) {
        measurableItemCurrentId ++;
    }
}
//Measurable

//Video Item
function VideoItemObject(id, url, media) {
  this.id = id;
  this.url = url;
  this.media = media;
}

export const addVideoItem = (id, url, media) => {
  const VideoObject = new VideoItemObject(id, url, media);
  videoItemArray.push(VideoObject)
}

export const getVideoItem = () => {
  return(videoItemArray);
}

export const addVideoImageID = () => {
    videoImageCurrentId ++;
}

export const getVideoImageID = () => {
    return videoImageCurrentId;
}

export const getMediaArray = () => {
    return videoItemArray;
}

export const setMediaArray = (videoArray) => {
    videoItemArray = videoArray;
    videoItemArray = videoItemArray['mediaArray']
}

export const setVideoImageID = () => {
    for (let i = 0; i < videoItemArray.length; i++) {
        videoImageCurrentId ++;
    }}
//Video Item

export const getIconItem = (type) => {
    return (type);
  }

export const primaryColor = '#3EB489';
export const companyName = 'Spogo';

