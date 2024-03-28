import logo from './logo.svg';
import './App.css';
import AllMembers from '../../client/src/components/allMembers';
import { Route, Routes } from 'react-router-dom';
import MemberDetails from './components/memberDetails';
import { useState } from 'react';
import UpdateMember from './components/updateMemberDetails';
import AddCoronaDetails from './components/addCoronaDetails';
import UpdateCoronaDetails from './components/updateCoronaDetails';

function App() {

  const [selectedMember, setSelectedMember] = useState();
  return (

    <div className="App">
      <Routes>
        <Route path='/' element={<AllMembers
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember} />} />

        <Route path='/addMember' element={<MemberDetails
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember} />} />

        <Route path='/updateMember' element={<UpdateMember
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember} />} />

        <Route path='/addCorona' element={<AddCoronaDetails
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember} />} />

        <Route path='/updateCorona' element={<UpdateCoronaDetails
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember} />} />
      </Routes>
    </div>
  );
}

export default App;
