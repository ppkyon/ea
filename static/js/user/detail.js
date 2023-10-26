$( function() {
    $( document ).on( 'click', '.profile-area .edit-button', function () {
        var target = $( this );
        var form_data = new FormData();
        form_data.append( 'id', $( this ).val() );
        $.ajax({
            'data': form_data,
            'url': $( '#user_get_url' ).val(),
            'type': 'POST',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
        }).done( function( response ){
            $( '#edit_user_modal [name=id]' ).val( response.display_id );
            $( '#edit_user_modal [name=created_at]' ).val( response.created_at );
            $( '#edit_user_modal [name=login]' ).val( response.login );
            $( '#edit_user_modal [name=family_name]' ).val( response.profile.family_name );
            $( '#edit_user_modal [name=first_name]' ).val( response.profile.first_name );
            $( '#edit_user_modal [name=family_name_kana]' ).val( response.profile.family_name_kana );
            $( '#edit_user_modal [name=first_name_kana]' ).val( response.profile.first_name_kana );
            $( '#edit_user_modal [name=email]' ).val( response.profile.email );
            $( target ).next().trigger( 'click' );
        }).fail( function(){
            
        });
    });
    
    $( document ).on( 'click', '#edit_user_modal .action-button', function () {
        if ( $( '#save_user_form' ).parsley().validate() ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'email', $( '#save_user_form [name=email]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#save_user_check_form' ).val(),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                if ( response.check ) {
                    $( '#edit_user_modal .error-message-area' ).addClass( 'd-none' );
                    $( '#edit_user_modal .error-message-area .error-message' ).text( '' );
                    $( '#edit_check_modal .yes-button' ).val( $( target ).val() );
                    $( target ).next().trigger( 'click' );
                    up_modal();
                } else {
                    $( '#edit_user_modal .error-message-area' ).removeClass( 'd-none' );
                    $( '#edit_user_modal .error-message-area .error-message' ).text( response.message );
                }
            }).fail( function(){
                $( '#edit_user_modal .error-message-area' ).removeClass( 'd-none' );
                $( '#edit_user_modal .error-message-area .error-message' ).text( 'ユーザーの編集に失敗しました' );
            });
        }
    });
    $( document ).on( 'click', '#edit_check_modal .yes-button', function () {
        if ( $( this ).val() == 'user' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_user_form [name=id]' ).val() );
            form_data.append( 'family_name', $( '#save_user_form [name=family_name]' ).val() );
            form_data.append( 'first_name', $( '#save_user_form [name=first_name]' ).val() );
            form_data.append( 'family_name_kana', $( '#save_user_form [name=family_name_kana]' ).val() );
            form_data.append( 'first_name_kana', $( '#save_user_form [name=first_name_kana]' ).val() );
            form_data.append( 'email', $( '#save_user_form [name=email]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#save_user_form' ).attr( 'action' ),
                'type': 'POST',
                'dataType': 'json',
                'processData': false,
                'contentType': false,
            }).done( function( response ){
                $( '#edit_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().trigger( 'click' );
                up_modal();
            }).fail( function(){
                $( '#edit_check_modal .no-button' ).trigger( 'click' );
                $( target ).next().next().trigger( 'click' );
                up_modal();
            });

        }
    });

    $( document ).on( 'click', '.profile-area .delete-button', function () {
        $( '#delete_check_modal .yes-button' ).val( $( this ).val() );
        $( this ).next().trigger( 'click' );
    });
    $( document ).on( 'click', '#delete_check_modal .yes-button', function () {
        var target = $( this );
        var form_data = new FormData();
        form_data.append( 'id', $( this ).val() );
        $.ajax({
            'data': form_data,
            'url': $( '#delete_user_url' ).val(),
            'type': 'POST',
            'dataType': 'json',
            'processData': false,
            'contentType': false,
        }).done( function( response ){
            $( '#delete_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().trigger( 'click' );
            up_modal();
        }).fail( function(){
            $( '#delete_check_modal .no-button' ).trigger( 'click' );
            $( target ).next().next().trigger( 'click' );
            up_modal();
        });
    });

    $( document ).on( 'click', '.history-area', function () {
        window.location.href = "/user/history/?year=" + $( this ).find( '[name=year]' ).val() + '&month=' + $( this ).find( '[name=month]' ).val();
    });

    if ( $( '#save_user_form' ).length ) {
        $( '#save_user_form' ).parsley();
        $( '#save_user_form' ).parsley().options.requiredMessage = "入力してください";
        $( '#save_user_form' ).parsley().options.typeMessage = "正しい形式で入力してください";
    }
});