import React,{useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;


//option 각각 값 할당후 map으로 출력
const PrivateOptions=[
    {value:0,label:"Private"},
    {value:1,label:"Public"}
]
const CatogoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" }
]


function VideoUploadPage() {
    const [VideoTitle,setVideoTitle]=useState("")
    const [Description,setDescription]=useState("")
    const [Private,setPrivate]=useState(0)
    const [Category,setCategory]=useState("File & Animation")

    const onTitleChange = (e)=> {//입력창에 받아들이도록 하는 함수
        setVideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange =(e)=>{
        setDescription(e.currentTarget.value)
    }
    const onCategoryChange=(e)=>{
        setCategory(e.currentTarget.value)
    }
    const onPrivateChange=(e)=>{
        setPrivate(e.currentTarget.value)
    }
    const onDrop=(files)=>{//파일 추가 함수
        let formData = new FormData;
        const config= {
                header: {'conent-type':'multipart/form-data'}//오류 방지를 위해 필요함 
        }
        formData.append("file",files[0])
        console.log(files)

        axios.post('/api/video/uploadfiles',formData,config)
        .then(response=> {
            if(response.data.success)
            {

            }
            else
            {
                alert('비디오 업로드를 실패했습니다');
            }
        })
    }

    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>       
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>Upload</Title>
            </div>
            <Form onSubmit>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={1000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                    {/*Thumbnail */}
                    <div>
                        <img src alt/>
                    </div>
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input
                onChange={onTitleChange}
                value={VideoTitle}
                />
                <br/>
                <br/>
                <label>Description</label>
                <TextArea>
                    onChange={onDescriptionChange}
                    value={Description}
                </TextArea>
                <br/>
                <br/>
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item,index)=>(
                        <option key={index} value={index.value}>{item.label}</option>
                    ))}
                </select>

                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CatogoryOptions.map((item,index)=>(
                        <option key={index} value={index.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage
