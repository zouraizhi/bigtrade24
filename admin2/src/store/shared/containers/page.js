import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../containerProps';
import { PageContainer } from 'theme';
import PageWrap from './PageWrap'

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PageWrap(PageContainer))
);
