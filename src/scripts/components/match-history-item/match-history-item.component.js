'use strict';

import './match-history-item.component.sass';

import React, {Component} from 'react';

import * as _ from 'lodash';
import moment from 'moment';

class MatchHistoryItemComponent extends Component {
    props = {
        item: null
    };

    team1 = 100;

    team2 = 200;

    constructor (props) {

        super(props);

    }

    /**
     * @method getMatchDuration
     * Get a more readable match duration <mm>m <ss>s
     * @returns {string}
     */

    getMatchDuration () {
        const time = (this.props.item.gameDuration / 60),
            mins = Math.floor(time),
            secs = Math.floor((time % 1) * 60);
        return `${mins}m ${secs}s`;
    }

    /**
     * @method getItemsList
     * @returns {*}
     */

    getItemsList () {
        let items = _.cloneDeep(this.props.item.items);
        if (items && items.length) {
            let itemIndex = 0;
            return items.map(item => {
                const emptyIndex = `empty-${itemIndex}`;
                if (item) {
                    return (
                        <li key={item.name}>
                            <img src={item.path} alt={item.name} />
                        </li>
                    );
                } else {
                    ++itemIndex;
                    return <li key={emptyIndex} className="empty"></li>;
                }
            });
        } else {
            return <li className="loading">Loading...</li>
        }
    }

    /**
     * @method getTeam
     * @param team
     * @returns {*}
     */

    getTeam (team) {
        if (team && team.length) {
            return team.map(player => {
               return <li key={player.summonerName}>
                   <img src={player.champion.path} alt={player.champion.name} />
                   <span>{player.summonerName}</span>
               </li>
            });
        }
    }

    render() {
        const containerClassNames = ['match-history-item', 'group'];
        const gameStart = moment(this.props.item.gameCreation).from(moment());
        const gameOutcome = this.props.item.gameResult ? 'Victory' : 'Defeat';
        const team1 = _.filter(this.props.item.players, { team: this.team1 });
        const team2 = _.filter(this.props.item.players, { team: this.team2 });

        containerClassNames.push(gameOutcome.toLowerCase());

        return (
            <div className={containerClassNames.join(' ')}>
                <div className="part1">
                    <span className="game-mode">{this.props.item.gameMode}</span>
                    <span className="game-started">{gameStart}</span>
                    <span className="game-outcome">{gameOutcome}</span>
                    <span className="game-duration">{this.getMatchDuration()}</span>
                </div>
                <div className="part2">
                    <img
                        src={this.props.item.champion.path}
                        alt={this.props.item.champion.name}
                    />
                    <div className="spells-and-runes">
                        <div className="summoner-spells">
                            <img
                                src={this.props.item.spell1.path}
                                alt={this.props.item.spell1.name}
                            />
                            <img
                                src={this.props.item.spell2.path}
                                alt={this.props.item.spell2.name}
                            />
                        </div>
                        <div className="runes-reforged">
                            <img
                                src={this.props.item.primaryPerk.path}
                                alt={this.props.item.primaryPerk.name}
                            />
                            <img
                                src={this.props.item.subPerk.path}
                                alt={this.props.item.subPerk.name}
                            />
                        </div>
                    </div>
                    <span className="champion-name">{this.props.item.champion.name}</span>
                </div>
                <div className="part3">
                    <div className="kda">
                        <span className="kills">{this.props.item.kills}</span>
                        <span className="deaths">{this.props.item.deaths}</span>
                        <span className="assists">{this.props.item.assists}</span>
                        <div className="kda-ratio">
                            {this.props.item.kda}:1 <span>KDA</span>
                        </div>
                    </div>
                </div>
                <div className="part4">
                    <span className="level">Level {this.props.item.championLevel}</span>
                    <span className="creep-score">{this.props.item.cs} ({this.props.item.cspm}) CS</span>
                    <span className="kill-participation">P/Kill {this.props.item.killParticipation}%</span>
                </div>
                <div className="part5">
                    <ul className="items-list">
                        {this.getItemsList()}
                    </ul>
                </div>
                <div className="part6">
                    <ul className="team1">
                        {this.getTeam(team1)}
                    </ul>
                    <ul className="team2">
                        {this.getTeam(team2)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default MatchHistoryItemComponent;