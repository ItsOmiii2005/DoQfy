
import Upload from '../components/Upload';


function StudentManagement(props) {
  return (
    <div className='mt-5 w-100 d-flex justify-content-center ' style={{ width: '100vw', height: '100%' }}>
    
      {console.log(props.userData.name)}      <Upload />
    </div>
  );
}

export default StudentManagement;