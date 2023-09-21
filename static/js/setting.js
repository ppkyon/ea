$( function() {
    $( document ).on( 'click', '#edit_manager_modal .action-button', function () {
        if ( $( '#save_manager_form' ).parsley().validate() ) {
            $( '#edit_check_modal .yes-button' ).val( $( this ).val() );
            $( this ).next().trigger( 'click' );
            up_modal();
        }
    });
    $( document ).on( 'click', '#edit_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_manager_form [name=id]' ).val() );
            form_data.append( 'family_name', $( '#save_manager_form [name=family_name]' ).val() );
            form_data.append( 'first_name', $( '#save_manager_form [name=first_name]' ).val() );
            form_data.append( 'family_name_kana', $( '#save_manager_form [name=family_name_kana]' ).val() );
            form_data.append( 'first_name_kana', $( '#save_manager_form [name=first_name_kana]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#save_manager_form' ).attr( 'action' ),
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

    $( document ).on( 'click', '.delete-button', function () {
        $( '#delete_check_modal .yes-button' ).val( $( this ).val() );
        $( this ).next().trigger( 'click' );
    });
    $( document ).on( 'click', '#delete_check_modal .yes-button', function () {
        if ( $( this ).val() == 'manager' ) {
            var target = $( this );
            var form_data = new FormData();
            form_data.append( 'id', $( '#save_manager_form [name=id]' ).val() );
            $.ajax({
                'data': form_data,
                'url': $( '#delete_manager_url' ).val(),
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
        }
    });
    
    if ( $( '#save_manager_form' ).length ) {
        $( '#save_manager_form' ).parsley();
        $( '#save_manager_form' ).parsley().options.requiredMessage = "入力してください";
    }
});