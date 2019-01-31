import React from 'react';
import { Link } from 'react-router-dom';
import ServerMember from './server_member';

class ServerMembers extends React.Component {

  componentDidMount() {
    this.props.fetchMembers(this.props.match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.server.id != this.props.match.params.serverId) {
      this.props.fetchMembers(this.props.match.params.serverId);
    }
  }

  render() {
    const admin = this.props.members.find((member) => {
      return member.id === this.props.server.admin_id;
    });

    let adminEl;
    let adminOnline;
    let adminOffline;
    if (admin) {
      adminEl = <ServerMember user={admin} />;
      if (admin.online) {
        adminOnline = 1;
        adminOffline = 0;
      } else {
        adminOnline = 0;
        adminOffline = 1;
      }
    } else {
      adminEl = null;
    }

    const online = this.props.members.filter(member => member.online);
    const offline = this.props.members.filter(member => !member.online);

    const onlineMembers = online.map((member, idx) => {
      if (member.id === this.props.server.admin_id) {
        return null
      } else {
        return <ServerMember key={idx}
          user={member}
        />;
      }
    });

    const offlineMembers = offline.map((member, idx) => {
      if (member.id === this.props.server.admin_id) {
        return null
      } else {
        return <ServerMember key={idx} user={member} />;
      }
    });

    return (
      <div className="server-members" >
        <div className="server-members-scroll">
          <div className="server-members-container">
            <h3>ADMIN</h3>
            {adminEl}
            {online.length > 0 ? <h3>{`ONLINE—${online.length - adminOnline}`}</h3> : null}
            {onlineMembers}
            {offline.length > 0 ? <h3>{`OFFLINE—${offline.length - adminOffline}`}</h3> : null}
            {offlineMembers}
          </div>
        </div>
      </div>
    )
  }
}

export default ServerMembers;