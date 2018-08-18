'use strict';

import './match-history.component.sass';

import React, {Component} from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

import MatchHistoryItemComponent from '../match-history-item/match-history-item.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class MatchHistoryComponent extends Component {
    state = {
        history: [],
        summonerName: '',
        showMatchHistory: false,
        isLoading: false
    };

    constructor (props) {

        super(props);

    }

    /**
     * @method getMatchHistory
     * @returns {Promise<AxiosResponse<any> | never>}
     */

    getMatchHistory = () => {
        this.setState({
            isLoading: true
        });
        return axios
            .get(`//localhost:8080/lol/match/history/${this.state.summonerName}`)
            .then(result => {
                if (result && result.data) {
                    const history = result.data;

                    this.setState({ history, isLoading: false });

                    return history;
                }

                return null;
            })
            .catch(result => {

                let errorResponse = _.get(result, 'response.data.error'),

                    error = 'Oops! Something\'s not quite right!';

                if (errorResponse) {

                    switch (errorResponse.statusCode) {
                        case 404:
                            error = 'Summoner not found!';
                        break;
                    }

                }

                return Promise.reject(error);

            });
    };

    /**
     * @method getMatchHistoryItems
     * @returns {*}
     */

    getMatchHistoryItems () {
        if (this.state.history && this.state.history.length) {
            return this.state.history.map(item => {
                return (
                    <li key={item.gameId}>
                        <MatchHistoryItemComponent item={item} />
                    </li>
                );
            });
        } else {
            return <li>Loading...</li>
        }
    }

    /**
     * @method summonerChange
     * @param event
     */

    summonerChange = (event) => {
        this.setState({summonerName: event.target.value});
    };

    /**
     * @method search
     */

    search = () => {
        if (
            this.state.summonerName &&
            !this.state.isLoading
        ) {
            return this
                .getMatchHistory()
                .then(() => {
                    this.setState({
                        showMatchHistory: true
                    });
                })
                .catch(err => {
                    this.setState({
                        isLoading: false
                    });
                    toast.error(err);
                });
        }
    };

    /**
     * @method changeSummoner
     */

    changeSummoner = () => {
        this.setState({
            history: [],
            showMatchHistory: false,
            summonerName: ''
        });
    };

    render() {
        const classes = ['container'];

        if (this.state.isLoading) {
            classes.push('loading');
        }
        return (
            <div className={classes.join(' ')}>
                {this.state && this.state.showMatchHistory &&
                    <div className="match-history">
                        <h1 className="title">LEAGUE OF LEGENDS</h1>
                        <h1 className="summoner-name">
                            {this.state.summonerName}
                            <button onClick={this.changeSummoner}>Change</button>
                        </h1>
                        <ul className="match-history-list">
                            {this.getMatchHistoryItems()}
                        </ul>
                    </div>
                }
                {this.state && !this.state.showMatchHistory &&
                    <div className="search">
                        {this.state.isLoading &&
                            <div className="loading">
                                <FontAwesomeIcon icon="cog" spin />
                            </div>
                        }
                        <input
                            type="text"
                            value={this.state.summonerName}
                            onChange={this.summonerChange}
                            placeholder="Enter Summoner Name"
                        />
                        <button onClick={this.search}>Go!</button>
                    </div>
                }
            </div>
        )
    }
}

export default MatchHistoryComponent;