/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { translate as __ } from 'i18n-calypso';
import Card from 'components/card';
import classNames from 'classnames';
import Button from 'components/button';
import Gridicon from 'components/gridicon';

/**
 * Internal dependencies
 */
import { isDevMode, isUnavailableInDevMode } from 'state/connection';
import { userCanManageModules, isSitePublic } from 'state/initial-state';
import { getSitePlan } from 'state/site';
import { isModuleFound } from 'state/search';

export const SettingsGroup = React.createClass( {
	render() {
		let module = this.props.module,
			support = this.props.support
					? this.props.support
					: false,
			// Disable in Dev Mode
			disableInDevMode =
				this.props.disableInDevMode &&
				this.props.isUnavailableInDevMode( module.module );

		if ( ! support && module && '' !== module.learn_more_button ) {
			support = module.learn_more_button;
		}

		if ( ! this.props.isModuleFound( module.module ) ) {
			return null;
		}

		return (
			<div className="jp-form-settings-group">
				<Card className={ classNames( {
						'jp-form-has-child': this.props.hasChild,
						'jp-form-settings-disable': disableInDevMode
					} ) }>
					{
						disableInDevMode && <div className="jp-form-block-fade"></div>
					}
					{
						support && (
							<div className="jp-module-settings__learn-more">
								<Button borderless compact href={ support }>
									<Gridicon icon="help-outline" />
									<span className="screen-reader-text">{ __( 'Learn More' ) }</span>
								</Button>
							</div>
						)
					}
				{
					this.props.children
				}
				</Card>
			</div>
		);
	}
} );

export default connect(
	( state ) => {
		return {
			isDevMode: isDevMode( state ),
			sitePlan: getSitePlan( state ),
			isSitePublic: isSitePublic( state ),
			isModuleFound: ( module ) => isModuleFound( state, module ),
			userCanManageModules: userCanManageModules( state ),
			isUnavailableInDevMode: module_name => isUnavailableInDevMode( state, module_name )
		};
	}
)( SettingsGroup );
