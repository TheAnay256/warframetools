import React, {Component} from 'react';
import { Table } from 'reactstrap';

export default class MissionRewards extends Component {
    render () {

        let dropTableContent = this.props.data.map((entry, index) => {
            return <tr key={entry.mission + entry.index} >
                <td>{entry.mission}</td>
                <td>{entry.rotation || "N/A"}</td>
                <td>{entry.rarity}</td>
            </tr>;
        });

        return <div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th>Rotation</th>
                        <th>Drop Chance</th>
                    </tr>
                </thead>
                <tbody>
                    {dropTableContent}
                </tbody>
            </Table>
        </div>;
    }
}

