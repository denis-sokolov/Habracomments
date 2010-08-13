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

$(document).ready(function(){
	comHeader = $('#comments > .comments-header');
	comHeaderInfo = $('<span class="sokolovInfo" style="border-bottom: 1px dotted #AFA56A; margin-left: 1em">скрыты ниже <span class="minRating"></span></span>').appendTo(comHeader);
	
	function showAll()
	{
		$('#comments .sokolovHidden').removeClass('sokolovHidden');
	}

	function filter(minRating)
	{
		showAll();
		$('#comments .comment_holder').each(function(){
			var me = $(this);
			var rating = parseInt(me.children('.msg-meta').find('.vote .mark span').text().replace('–','-'));
			if (rating < minRating)
				me.addClass('sokolovHidden');
		});
		comHeaderInfo.children('.minRating').text(minRating);
	}

	// Init
	$('<style type="text/css"></style>').text(
		'#comments .sokolovHidden > .msg-meta:hover { background-color: #B4FA8D }'
		+'#comments .sokolovHidden > .entry-content, '
		+'#comments .sokolovHidden > .msg-meta .date, '
		+'#comments .sokolovHidden > .msg-meta .bookmark, '
		+'#comments .sokolovHidden > .msg-meta .up-to-parent, '
		+'#comments .sokolovHidden > .msg-meta .to-favs { display: none }').appendTo('head');

	$('#comments .sokolovHidden > .msg-meta').live('click', function(){
		$(this).parent()
			.children('.entry-content').show('slow').attr('style','')
			.parent().removeClass('sokolovHidden');
	});

	comHeaderInfo.click(function(){
		minRating = prompt('Какой поставить минимальный рейтинг?');
		if (typeof minRating != 'undefined')
			filter(minRating);
	});
	// Endinit


	comCount = parseInt(comHeader.children('.js-comments-count').text());
	if (comCount < 8)
		filter(-1);
	else if (comCount < 25)
		filter(3);
	else if (comCount < 40)
		filter(4);
	else
		filter(5);
});