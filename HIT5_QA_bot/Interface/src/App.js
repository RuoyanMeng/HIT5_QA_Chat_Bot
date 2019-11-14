import * as React from 'react';
import Main from './Main';
import { Sidebar,Menu,Segment,Icon,Header,Image } from 'semantic-ui-react';


const App = ({}) => {
    const [isOpen,setOpen]=React.useState(false);

	return (
		<Sidebar.Pushable >
			<Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical direction="top" visible={isOpen} width="thin">
            <h1>Controls here</h1>
			</Sidebar>

			<Sidebar.Pusher>

					<Main toggleSidebar={()=>setOpen(!isOpen)}></Main>

			</Sidebar.Pusher>
		</Sidebar.Pushable>
	);
};

export default App;
