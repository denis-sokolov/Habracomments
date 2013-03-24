/*!
HabraComments - Hide comments with a small rating.
Copyright (C) 2010 Denis Sokolov http://sokolov.cc

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

jQuery(document).ready(function($){
	'use strict';
	var Q = {
		container: '#comments',
		header: '> .title',
		count: '#comments_count',
		comment: {
			container: '.comment_item',
			info: '.info',
			scoreContainer: '.voting',
			score: '.score',
			sub: '.reply_comments'
		}
	};

	var comHeader = $(Q.container + Q.header);

	if (comHeader.length === 0) {
		return;
	}

	var comHeaderInfo = $('<span class="sokolovInfo" style="border-bottom: 1px dotted #AFA56A; margin-left: 1em">скрыты ниже <span class="minRating"></span></span>').appendTo(comHeader);

	function showAll() {
		$(Q.container + ' .sokolovHidden').removeClass('sokolovHidden');
	}

	function filter(minRating)
	{
		showAll();
		$(Q.container + ' ' + Q.comment.container).each(function(){
			var me = $(this);
			var rating = parseInt(me.find(Q.comment.info+':eq(0)').find(Q.comment.score).text().replace('–','-'), 10);
			if (rating < minRating)
				me.addClass('sokolovHidden');
		});
		comHeaderInfo.children('.minRating').text(minRating);
	}

	// Init
	$('<style type="text/css"></style>').text(
		Q.container + ' .sokolovHidden > .comment_body > '+Q.comment.info+':hover { background-color: #B4FA8D }' +
		Q.container + ' .sokolovHidden > .comment_body > *:not('+Q.comment.info+') { display: none }' +
		Q.container + ' .sokolovHidden > '+Q.comment.sub+'{ margin-top: 0 !important}'
	).appendTo('head');

	$(Q.container).on('click', ' .sokolovHidden '+Q.comment.info, function(e){
		$(this).closest('.sokolovHidden').removeClass('sokolovHidden');
	});

	comHeaderInfo.click(function(){
		var minRating = prompt('Какой поставить минимальный рейтинг?');
		if (typeof minRating !== 'undefined')
			filter(minRating);
	});
	// Endinit


	var comCount = parseInt(comHeader.find(Q.count).text(), 10);
	if (comCount < 8)
		filter(-1);
	else if (comCount < 25)
		filter(3);
	else if (comCount < 40)
		filter(4);
	else
		filter(5);
});
